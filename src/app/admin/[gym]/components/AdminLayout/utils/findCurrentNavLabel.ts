import { NavItem } from '../constants/navigation';

export function findCurrentNavLabel(navItems: NavItem[], pathname: string): string {
  for (const item of navItems) {
    if (item.children?.length) {
      const child = item.children.find((c) => c.href && pathname.startsWith(c.href));
      if (child) return child.label;
    } else if (item.href && pathname.startsWith(item.href)) {
      return item.label;
    }
  }
  return '';
}
