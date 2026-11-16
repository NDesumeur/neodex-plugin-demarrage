// Démarrage : ton appli d'origine (HTML et code inchangés), livrée en plugin.
// Ses données sont dans le dossier du plugin, que NeoDex sauvegarde (synchro cloud et sauvegardes) ; à la première ouverture elle reprend ce que tu avais dans NeoDex.
// Elle tourne dans le bac à sable de NeoDex, avec ses outils d'interface (ctx.host) et seulement les autorisations de son plugin.json.
const HTML = "<div class=\"appWrap wide\">\n      <div class=\"agHead\"><span class=\"label\">Démarrage</span><span class=\"hint\" id=\"suInfo\"></span><div class=\"agNav\"><button class=\"btn px\" id=\"suRefresh\">ACTUALISER</button></div></div>\n      <div class=\"hint\">Les programmes qui se lancent tout seuls quand tu allumes le PC. En désactiver un ne le désinstalle pas : il ne démarre simplement plus tout seul, comme dans le Gestionnaire des tâches. Le changement compte au prochain démarrage.</div>\n      <div id=\"suList\"></div>\n    </div>";
/*CSS-MOVED*/ const CSS = `#suList{display:grid;grid-template-columns:repeat(auto-fill,minmax(clamp(420px,30vw,620px),1fr));gap:clamp(10px,.8vw,14px)}
#suList>.hint{grid-column:1/-1}
@media (max-width:560px){#suList{grid-template-columns:1fr}}
.sysCard.suRow{flex-direction:row;align-items:center;gap:14px;padding:12px 16px}
.suRow img{width:clamp(28px,2.2vw,40px);height:clamp(28px,2.2vw,40px);object-fit:contain;flex:none}
.suRow.off{opacity:.6}
.suRow .tn{flex:1;min-width:0;color:#fff;font-size:clamp(16px,1.1vw,19px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.suRow small{display:block;font-size:clamp(12px,.85vw,14px);color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.suSwitch{display:flex;align-items:center;gap:10px;font:clamp(10px,.7vw,12px) var(--title);letter-spacing:1px;color:var(--lilac);cursor:var(--cp,pointer);flex:none}
.suSwitch input{accent-color:var(--magenta);width:18px;height:18px}
`;  // le style de ce plugin (il utilise les variables du thème de NeoDex)
export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const host = ctx.host, { el, toast, sfx, ask, newTab, pixIcon, PIX, WX } = host;
  const folder = ctx.folder, legacy = ctx.legacy || {};
  ctx.host.addStyle(CSS);
  view.innerHTML = HTML;
  const $ = id => id === "startupApp" ? view : (view.querySelector('#' + id) || document.getElementById(id));  // les identifiants de ta vue d'abord, puis ceux de la page (fenêtres, menus)
  const doc = async n => { try { return await folder.read(n); } catch { return null; } };
  const __icon = () => ctx.icon;  // l'icône de ce plugin
  // ---- ton code d'origine ----
/* ---------- Démarrage app: programs launched with Windows, switched on / off like in the Task Manager ---------- */
async function suOpen() {
  $('suList').replaceChildren(el('div', 'hint', 'Lecture…'));
  const list = await neo.startupList(), on = list.filter(i => i.enabled).length;
  $('suInfo').textContent = list.length + ' programme' + (list.length > 1 ? 's' : '') + ' · ' + on + ' activé' + (on > 1 ? 's' : '');
  $('suList').replaceChildren(...list.sort((a, b) => b.editable - a.editable || a.name.localeCompare(b.name, 'fr')).map(it => {
    const r = el('div', 'sysCard px suRow' + (it.enabled ? '' : ' off')), ic = el('img'), n = el('div', 'tn'), sw = el('label', 'suSwitch'), cb = el('input');
    ic.onerror = () => ic.style.visibility = 'hidden'; if (it.exe) neo.exeIcon(it.exe).then(u => { ic.src = u; }, () => ic.onerror()); else ic.onerror();  // l'icône du programme, donnée par NeoDex
    n.append(it.name, el('small', '', it.label + ' · ' + it.command));
    n.title = it.name + ' · ' + it.command;  // le nom et la commande en entier, s'ils sont coupés
    cb.type = 'checkbox'; cb.checked = it.enabled; cb.disabled = !it.editable;
    cb.onchange = async () => {
      try { await neo.startupSet({source: it.source, name: it.name, file: it.file, enabled: cb.checked}); toast(it.name + (cb.checked ? ' se lancera' : ' ne se lancera plus') + ' au prochain démarrage de Windows'); }
      catch (e) { cb.checked = !cb.checked; toast('Impossible : ' + e.message.replace(/^.*Error: /, ''), true); }
      suOpen();
    };
    sw.append(cb, el('span', '', it.editable ? (it.enabled ? 'ACTIVÉ' : 'DÉSACTIVÉ') : 'ADMIN'));
    sw.title = it.editable ? '' : 'Ce programme est lancé pour tous les utilisateurs : seul un administrateur peut le changer (Gestionnaire des tâches → Démarrage).';
    r.append(ic, n, sw);
    return r;
  }));
}
$('suRefresh').onclick = suOpen;  // (non indenté : les textes sur plusieurs lignes restent exactement les tiens)
  // ---- fin ----
  ctx.onOpen(() => { suOpen(); });
}
