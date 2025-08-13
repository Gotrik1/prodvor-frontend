
import { AdminStatisticsPage } from '@/views/admin/pages/statistics';
import { AdminLayout } from '@/views/admin/pages/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Статистика | ProDvor',
    description: 'Просмотр статистики по пользователям, командам, турнирам и спонсорам.',
};

export default function Page() {
    return (
        <AdminLayout>
            <AdminStatisticsPage />
        </AdminLayout>
    );
}
