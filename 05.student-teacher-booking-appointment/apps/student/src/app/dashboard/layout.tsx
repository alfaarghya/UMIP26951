import Sidebar from '@stba/ui/Sidebar';
import { Role } from '@stba/types/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar role={Role.STUDENT} />
      <main className="flex-1 overflow-y-auto bg-white p-6">{children}</main>
    </div>
  );
}
