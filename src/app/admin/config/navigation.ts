export interface NavItem {
  label: string; // * 메뉴 이름
  href: string; // * 경로 (gym 동적 세그먼트 포함)
  key: string; // * 현재 페이지 확인용 고유 키
}

export const getNavItems = (gymDomain: string): NavItem[] => [
  {
    label: '일일 패스 현황',
    href: `/admin/${gymDomain}/pass-list`,
    key: 'pass-list',
  },
  {
    label: '패스 통계',
    href: `/admin/${gymDomain}/pass-analytics`,
    key: 'pass-analytics',
  },
];
