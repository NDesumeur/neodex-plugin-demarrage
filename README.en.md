# Démarrage (Startup)

The list of programs that launch by themselves when you turn on the PC, with a switch for each one, exactly like the Startup tab of the Windows Task Manager.

*Version française : [README.md](README.md)*

## How to use it

- Each row shows the program's icon, its name, where it is launched from and the exact command that starts it. At the top: the number of programs and how many are enabled.
- **Enabled / Disabled**: turns automatic launch off or back on. The change takes effect **at the next Windows startup**; a message confirms it.
- **Refresh** reads the list again, for example after installing a program.

Disabling a program does not uninstall or close it: it simply no longer starts by itself. You can enable it again at any time.

## Where the programs come from

Démarrage reads the same places as Windows:

- **Your account**: programs launched for you alone (registry and your profile's Startup folder). You can change them freely.
- **All users**: programs launched for everyone on this PC, 64- and 32-bit, and the shared Startup folder. They are marked **Admin**: only an administrator can change them, from Task Manager → Startup.

Switching uses the same settings as the Task Manager: what you change here shows up there, and the other way round. Entries are never deleted.

## Data and sync

Nothing is synced: startup programs are this PC's own. The plugin asks for access to Windows startup and system information.

## Install

In NeoDex: **NeoStore → Discover → Démarrage → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
