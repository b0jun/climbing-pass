'use client';

import AdminLayoutProvider from './AdminLayoutProvider';
import { Content } from './Content';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  gymName: string;
  location: string;
  logo: string;
}

const AdminLayout = ({ children, gymName, logo, location }: AdminLayoutProps) => {
  return (
    <AdminLayoutProvider gymName={gymName} logo={logo} location={location}>
      <AdminLayout.Sidebar />
      <div className="w-full bg-[#faf9f6]">
        <AdminLayout.Header />
        <AdminLayout.Content>{children}</AdminLayout.Content>
      </div>
    </AdminLayoutProvider>
  );
};

AdminLayout.Header = Header;
AdminLayout.Sidebar = Sidebar;
AdminLayout.Content = Content;

export default AdminLayout;
