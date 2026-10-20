#!/usr/bin/env python3
"""Install this package's skill folders without replacing existing skills."""
import argparse
import shutil
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group()
    group.add_argument('--agent', choices=['codex', 'claude'])
    group.add_argument('--target', type=Path, help='Explicit skills directory (also useful for isolated validation)')
    parser.add_argument('--include', nargs='+', default=[], metavar='SKILL', help='Optional bundled third-party skills to copy alongside the core')
    parser.add_argument('--list', action='store_true', help='List core and optional bundled skills without installing')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    source = root / 'skills'
    skills = sorted(p for p in source.iterdir() if p.is_dir() and (p / 'SKILL.md').is_file())
    third_party = root / 'third_party' / 'skills'
    optional = {p.name: p for p in third_party.iterdir() if p.is_dir() and (p / 'SKILL.md').is_file()} if third_party.exists() else {}
    if args.list:
        print('Core: ' + ', '.join(p.name for p in skills))
        print('Optional: ' + ', '.join(sorted(optional)))
        return
    if not args.target and not args.agent:
        parser.error('Choose --agent or --target, or use --list.')
    unknown = sorted(set(args.include) - set(optional))
    if unknown:
        parser.error('Unknown optional skills: ' + ', '.join(unknown) + '. Use --list.')
    skills.extend(optional[name] for name in sorted(set(args.include)))
    dest = args.target.expanduser().resolve() if args.target else Path.home() / ('.agents/skills' if args.agent == 'codex' else '.claude/skills')
    if not skills:
        parser.error('No skill folders found in this package.')
    conflicts = [dest / p.name for p in skills if (dest / p.name).exists() or (dest / p.name).is_symlink()]
    if conflicts:
        parser.exit(1, 'Nothing installed. Existing folders must be reviewed first:\n' + '\n'.join(str(p) for p in conflicts) + '\n')
    # No account configuration, plugin installation, network or content upload.
    dest.mkdir(parents=True, exist_ok=True)
    installed = []
    try:
        for p in skills:
            target = dest / p.name
            shutil.copytree(p, target)
            installed.append(target)
    except Exception as exc:
        parser.exit(1, f'Installation stopped: {exc}\nCompleted folders: ' + ', '.join(str(p) for p in installed) + '\n')
    print(f'Copied {len(installed)} skills to {dest}. Client loading and video production still need verification.')


if __name__ == '__main__':
    main()
