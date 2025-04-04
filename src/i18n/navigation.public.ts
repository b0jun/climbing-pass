import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing.public';

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
