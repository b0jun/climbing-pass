import { MenuIcon } from '@/components/SVG';
import { usePathname } from '@/navigation';

const getPageTitle = (pathname: string) => {
  const pathSegments = pathname.split('/');
  const managerPath = pathSegments.slice(3).join('/');
  const menuMap: Record<string, string> = {
    passList: '일일패스 현황',
    passAnalytics: '패스 통계',
  };

  return menuMap[managerPath] || '일일패스 현황';
};

const Header = ({
  isSidebarOpen,
  isDesktop,
  openSidebar,
}: {
  isSidebarOpen: boolean;
  isDesktop: boolean;
  openSidebar: () => void;
}) => {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="h-[56px] flex gap-2 transition-all duration-300 ease-in-out items-center px-4 sticky top-0 bg-[#faf9f6] z-[999] ml-0 lg:ml-[250px]">
      {!isSidebarOpen && !isDesktop && (
        <button onClick={openSidebar} className="lg:hidden">
          <MenuIcon width={24} height={24} />
        </button>
      )}
      <p className="ml-4 flex items-center font-bold text-[18px] text-[#4d4d4d]">{title}</p>
    </header>
  );
};
export default Header;
