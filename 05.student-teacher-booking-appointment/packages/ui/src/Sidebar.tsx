'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import 'remixicon/fonts/remixicon.css'
import { Role } from '@stba/types/client';

interface SideBarProps {
  role: Role;
}

const Sidebar = ({ role }: SideBarProps) => {
  const pathname = usePathname();

  //navigation button based on role
  const getNavItems = () => {
    switch (role) {
      case Role.ADMIN:
        return [
          { label: 'Teachers', href: '/dashboard/teacher', icon: 'ri-team-fill' },
          { label: 'Students / Approved', href: '/dashboard/student/approved', icon: 'ri-user-follow-fill' },
          { label: 'Students / Pending', href: '/dashboard/student/pending', icon: 'ri-user-shared-fill' },
          { label: 'Students / Denied', href: '/dashboard/student/denied', icon: 'ri-user-forbid-fill' },
        ];
      case Role.TEACHER:
        return [
          { label: 'Appointments / Approved', href: '/dashboard/appointment/approved', icon: 'ri-checkbox-circle-line' },
          { label: 'Appointments / Pending', href: '/dashboard/appointment/pending', icon: 'ri-time-line' },
          { label: 'Appointments / Cancelled', href: '/dashboard/appointment/cancelled', icon: 'ri-close-circle-line' },
        ];
      case Role.STUDENT:
        return [
          { label: 'Book Appointment', href: '/dashboard/appointment/create', icon: 'ri-calendar-check-line' },
          { label: 'Your Appointments', href: '/dashboard/appointment', icon: 'ri-calendar-line' },
        ];
      default:
        return [];
    }
  };
  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 space-y-4 h-screen">
      <h2 className="text-xl font-semibold mb-4">{role} Dashboard</h2>
      <nav className="space-y-2">
        {/* nav items on sidebar */}
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition',
              pathname === item.href && 'bg-gray-800'
            )}
          >
            <i className={clsx(item.icon, 'text-lg')} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
