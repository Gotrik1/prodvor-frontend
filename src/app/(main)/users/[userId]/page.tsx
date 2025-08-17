
import { users } from '@/mocks';
import { PlayerPageTemplate } from '@/views/admin/ui/templates/player-page-template';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { userId: string } }): Promise<Metadata> {
  const user = users.find(u => u.id === params.userId);
  const title = user ? `Профиль ${user.nickname} | ProDvor` : 'Пользователь не найден | ProDvor';
  const description = user ? `Публичный профиль пользователя ${user.firstName} ${user.lastName} (${user.nickname}).` : 'Запрошенный пользователь не найден.';

  return {
    title,
    description,
  };
}


export default function UserProfilePage({ params }: { params: { userId: string } }) {
   const user = users.find(s => s.id === params.userId);

  // Using the unified PlayerPageTemplate for all user roles on public pages.
  return <PlayerPageTemplate user={user} />;
}
