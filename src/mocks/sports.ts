export interface Subdiscipline {
  id: string;
  name: string;
}

export interface Sport {
  id: string;
  name: string;
  isTeamSport: boolean;
  subdisciplines?: Subdiscipline[];
}

const sportsData: Omit<Sport, 'subdisciplines'> & { subdisciplines?: string[] }[] = [
  // Командные виды спорта
  { id: 'sport-1', name: 'Футбол', isTeamSport: true, subdisciplines: ['мини-футбол', 'пляжный футбол', 'футзал', 'уличный футбол'] },
  { id: 'sport-2', name: 'Баскетбол', isTeamSport: true, subdisciplines: ['3х3', 'стритбол', 'классический'] },
  { id: 'sport-3', name: 'Волейбол', isTeamSport: true, subdisciplines: ['пляжный', 'классический', 'мини-волейбол'] },
  { id: 'sport-4', name: 'Хоккей', isTeamSport: true, subdisciplines: ['на льду', 'с мячом', 'роллер-хоккей', 'уличный'] },
  { id: 'sport-5', name: 'Гандбол', isTeamSport: true },
  { id: 'sport-6', name: 'Регби', isTeamSport: true, subdisciplines: ['классическое', 'регби-7', 'тач-регби'] },
  { id: 'sport-7', name: 'Водное поло', isTeamSport: true },
  { id: 'sport-8', name: 'Лакросс', isTeamSport: true },
  { id: 'sport-9', name: 'Флорбол', isTeamSport: true },
  { id: 'sport-10', name: 'Хоккей на траве', isTeamSport: true },
  { id: 'sport-11', name: 'Крикет', isTeamSport: true },
  { id: 'sport-12', name: 'Бейсбол / Софтбол', isTeamSport: true },
  { id: 'sport-13', name: 'Американский футбол', isTeamSport: true },
  { id: 'sport-14', name: 'Корфбол', isTeamSport: true },
  { id: 'sport-15', name: 'Нетбол', isTeamSport: true },
  { id: 'sport-16', name: 'Сепак такро', isTeamSport: true },
  { id: 'sport-17', name: 'Алтимат фрисби', isTeamSport: true },
  { id: 'sport-18', name: 'Пейнтбол / Лазертаг', isTeamSport: true },
  { id: 'sport-19', name: 'Киберспорт', isTeamSport: true, subdisciplines: ['CS2', 'Dota 2', 'Valorant'] },
  { id: 'sport-20', name: 'Командные беговые эстафеты', isTeamSport: true },
  { id: 'sport-21', name: 'Дворовые игры', isTeamSport: true, subdisciplines: ['вышибалы', 'лапта', 'казаки-разбойники', 'городки командные'] },
  { id: 'sport-22', name: 'Командный туризм и ориентирование', isTeamSport: true },
  { id: 'sport-23', name: 'Гребля на лодках-драконах', isTeamSport: true },
  { id: 'sport-24', name: 'Командные шахматы', isTeamSport: true, subdisciplines: ['лиги'] },

  // Некомандные виды спорта
  { id: 'sport-25', name: 'Лёгкая атлетика', isTeamSport: false, subdisciplines: ['бег', 'прыжки', 'метания'] },
  { id: 'sport-26', name: 'Плавание', isTeamSport: false, subdisciplines: ['индивидуальные заплывы'] },
  { id: 'sport-27', name: 'Теннис', isTeamSport: false, subdisciplines: ['большой', 'настольный', 'падел'] },
  { id: 'sport-28', name: 'Бадминтон', isTeamSport: false },
  { id: 'sport-29', name: 'Сквош', isTeamSport: false },
  { id: 'sport-30', name: 'Единоборства', isTeamSport: false, subdisciplines: ['бокс', 'дзюдо', 'самбо', 'карате', 'тхэквондо', 'MMA'] },
  { id: 'sport-31', name: 'Фехтование', isTeamSport: false },
  { id: 'sport-32', name: 'Стрельба', isTeamSport: false, subdisciplines: ['лук', 'арбалет', 'огнестрельное оружие'] },
  { id: 'sport-33', name: 'Тяжёлая атлетика', isTeamSport: false },
  { id: 'sport-34', name: 'Пауэрлифтинг', isTeamSport: false },
  { id: 'sport-35', name: 'Кроссфит', isTeamSport: false },
  { id: 'sport-36', name: 'Гимнастика', isTeamSport: false, subdisciplines: ['спортивная', 'художественная'] },
  { id: 'sport-37', name: 'Йога / стретчинг', isTeamSport: false },
  { id: 'sport-38', name: 'Скалолазание', isTeamSport: false, subdisciplines: ['боулдеринг', 'спортивное'] },
  { id: 'sport-39', name: 'Серфинг / виндсёрфинг / кайтсёрфинг', isTeamSport: false },
  { id: 'sport-40', name: 'Сноуборд / горные лыжи', isTeamSport: false },
  { id: 'sport-41', name: 'Конный спорт', isTeamSport: false },
  { id: 'sport-42', name: 'Велоспорт', isTeamSport: false, subdisciplines: ['шоссе', 'BMX', 'маунтинбайк'] },
  { id: 'sport-43', name: 'Скейтбординг / роликовый спорт', isTeamSport: false },
  { id: 'sport-44', name: 'Парашютный спорт', isTeamSport: false },
  { id: 'sport-45', name: 'Парапланеризм', isTeamSport: false },
  { id: 'sport-46', name: 'Триатлон', isTeamSport: false },
  { id: 'sport-47', name: 'Гольф', isTeamSport: false },
  { id: 'sport-48', name: 'Автоспорт / мотоспорт', isTeamSport: false },
  { id: 'sport-49', name: 'Индивидуальные шахматы', isTeamSport: false },
  { id: 'sport-50', name: 'Настольные игры как спорт', isTeamSport: false, subdisciplines: ['го', 'шашки'] },
];

export const allSports: Sport[] = sportsData.map(sport => ({
  ...sport,
  subdisciplines: sport.subdisciplines?.map((subName, index) => ({
    id: `${sport.id}-${index + 1}`,
    name: subName,
  })),
}));

export const teamSports = allSports.filter(sport => sport.isTeamSport);
export const individualSports = allSports.filter(sport => !sport.isTeamSport);
