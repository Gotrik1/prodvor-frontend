

export interface SitemapItem {
  name: string;
  description: string;
  path: string;
  icon: keyof typeof import('lucide-react');
  children?: SitemapItem[];
}

export interface SitemapCategory {
  name: string;
  icon: keyof typeof import('lucide-react');
  items: SitemapItem[];
}

export const siteMapData: SitemapCategory[] = [
  {
    name: "Публичные страницы",
    icon: "Globe",
    items: [
      { name: "Главная страница", description: "Лендинг для новых пользователей.", path: "/", icon: "Home" },
      { name: "О платформе", description: "Информация о миссии и возможностях ProDvor.", path: "/about", icon: "Info" },
      { name: "Авторизация", description: "Страница входа в аккаунт.", path: "/auth", icon: "LogIn" },
      { name: "Регистрация", description: "Создание нового аккаунта.", path: "/auth/register", icon: "UserPlus" },
      { name: "Магазин", description: "Покупка виртуальных товаров и PRO-статусов.", path: "/store", icon: "ShoppingCart", children: [
        { name: "PRO-статусы", description: "Страница с описанием преимуществ PRO.", path: "/store/pro", icon: "Award" },
      ]},
    ],
  },
  {
    name: "Основное приложение",
    icon: "AppWindow",
    items: [
      { name: "Дашборд (Лента)", description: "Главный экран пользователя с лентой новостей.", path: "/dashboard", icon: "LayoutDashboard" },
      { name: "Команды", description: "Список своих и чужих команд, создание новой.", path: "/teams", icon: "Users" },
      { name: "Соревнования", description: "Хаб турниров, лиг и вызовов.", path: "/competitions", icon: "Trophy" },
      { name: "Тренировочный центр", description: "Планирование тренировок и конструктор планов.", path: "/training-center", icon: "Dumbbell" },
      { name: "AI-Аналитик", description: "Анализ матчей с помощью ИИ.", path: "/analysis/match", icon: "Bot" },
      { name: "Центр судей", description: "Профессиональные инструменты для судей.", path: "/referee-center", icon: "Gavel" },
      { name: "Хаб сообщества", description: "Поиск игроков и команд (LFG).", path: "/lfg", icon: "Search" },
      { name: "Площадки", description: "Карта и список спортивных площадок.", path: "/playgrounds", icon: "Map" },
      { name: "Квесты", description: "Список ежедневных, еженедельных и событийных заданий.", path: "/quests", icon: "Puzzle" },
      { name: "Инвентарь", description: "Просмотр купленных и полученных предметов.", path: "/inventory", icon: "Warehouse" },
      { name: "Настройки", description: "Управление профилем, аккаунтом и приватностью.", path: "/settings", icon: "Settings" },
    ],
  },
  {
    name: "Панель администратора",
    icon: "Shield",
    items: [
      { name: "Управление данными", description: "Просмотр и редактирование всех сущностей.", path: "/admin/dashboard", icon: "Database" },
      { name: "Карта приложения", description: "Интерактивная схема всех разделов сайта.", path: "/admin/app-map", icon: "Map" },
      { name: "Ad-CRM: Монетизация", description: "Симулятор и инструменты для управления рекламой.", path: "/admin/advertising", icon: "DollarSign" },
      { name: "Управление доступом", description: "Панель для управления ролями и доступом администраторов.", path: "/admin/access-control", icon: "KeyRound" },
      { name: "Симуляция", description: "Вход под видом других пользователей.", path: "/admin/simulation", icon: "Eye" },
      { name: "Справка и Документация", description: "Концепция, API, техническая документация.", path: "/admin/docs", icon: "BookOpen" },
    ],
  },
];
