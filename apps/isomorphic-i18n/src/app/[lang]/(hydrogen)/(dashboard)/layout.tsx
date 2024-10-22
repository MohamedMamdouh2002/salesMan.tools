import AdminGuard from '@/app/components/AdminGuard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <AdminGuard>
            {children}
        </AdminGuard>
    );
}
