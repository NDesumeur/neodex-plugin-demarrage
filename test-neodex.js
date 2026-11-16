// lancé par le test « local » de NeoDex : la liste des programmes au démarrage (lecture seule, aucun interrupteur touché) se range en colonnes selon la largeur, rien ne déborde
module.exports = async ({ pj: js, sleep }) => {
  let n = 0; for (let i = 0; i < 20 && !(n = await js(`document.querySelectorAll('#suList .suRow').length`)); i++) await sleep(300);
  const r = await js(`(() => { const rows = [...document.querySelectorAll('#suList .suRow')], cols = new Set(rows.slice(0, 4).map(e => Math.round(e.getBoundingClientRect().left)));
    return { n: rows.length, cols: cols.size, w: innerWidth, font: rows[0] ? parseFloat(getComputedStyle(rows[0].querySelector('.tn')).fontSize) : 0,
      clip: rows.filter(e => e.querySelector('.tn').getBoundingClientRect().right > e.querySelector('.suSwitch').getBoundingClientRect().left + 1).length,
      over: [...document.querySelectorAll('#suList *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).length }; })()`);
  if (r.over) throw new Error(r.over + ' élément(s) débordent à droite');
  if (r.clip) throw new Error(r.clip + ' nom(s) passent sous l’interrupteur');
  if (r.n > 1 && r.w >= 1400 && r.cols < 2) throw new Error('une seule colonne en grand écran : ' + JSON.stringify(r));
  await sleep(1000);
  return r.n + ' programmes, ' + r.cols + ' colonne(s), noms en ' + r.font + ' px';
};
