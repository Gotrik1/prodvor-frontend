
export const marketBenchmarks = [
    { metric: 'Интернет-сервисы (Digital)', value: '470,2 млрд ₽', change: '+22 %', source: 'АКАР' },
    { metric: 'Доля соцсетей (без video)', value: '≈ 145 млрд ₽', change: '+18 %', source: 'АРИР' },
    { metric: 'Инфлюенс-маркетинг', value: '42–47 млрд ₽', change: '+37 %', source: 'ADPASS' },
];

export const ecpmBenchmarks = [
    { platform: 'VK Ads (лента)', ecpm: '110,5 ₽', source: 'Texterra' },
    { platform: 'myTarget (OK + Дзен)', ecpm: '55–70 ₽', source: 'Хабр' },
    { platform: 'Telegram Ads', ecpm: '€1 ≈ 105 ₽ min', source: 'eLama' },
    { platform: 'Нативные пост-интеграции VK', ecpm: 'экв. 50–80 ₽', source: 'Блог Click.ru' },
];

export const initialAssumptions = [
    { parameter: 'MAU', value: '500 000', confirmation: 'типичный горизонт 2-го года для нишевых сетей' },
    { parameter: 'Сессий / месяц', value: '12', confirmation: '≈0,4 DAU' },
    { parameter: 'Показов рекламы / сессию', value: '4', confirmation: 'комфортно без видео' },
    { parameter: 'Fill-rate', value: '70 %', confirmation: 'сезонный средний Vk/myTarget' },
    { parameter: 'Смешанный eCPM', value: '110 ₽', confirmation: 'см. рыночные ориентиры' },
];

export const annualRevenue = {
    formula: "Revenue ₽ = MAU × сессии/мес × показы/сессию × 12 мес × fill × eCPM / 1000",
    calculation: "500 000 × 12 × 4 × 12 × 0,7 × 110 / 1000 ≈ 22,2 млн ₽",
    total: 22.2
};

export const revenueDistribution = [
    { format: 'Нативные интеграции (посты, челленджи)', share: '60 %', revenue: '13,3 млн ₽' },
    { format: 'Баннеры (JPEG/HTML5)', share: '25 %', revenue: '5,5 млн ₽' },
    { format: 'Таргет (CPC/CPA)', share: '15 %', revenue: '3,3 млн ₽' },
];

export const sensitivityAnalysis = [
    { scenario: 'База', ecpm: '110', fill: '70%', revenue: 22.2 },
    { scenario: 'eCPM –15 %', ecpm: '93,5', fill: '70%', revenue: 18.8 },
    { scenario: 'eCPM +15 %', ecpm: '126,5', fill: '70%', revenue: 25.5 },
    { scenario: 'Fill –15 %', ecpm: '110', fill: '59,5%', revenue: 18.8 },
    { scenario: 'Fill +15 %', ecpm: '110', fill: '80,5%', revenue: 25.5 },
    { scenario: 'Оба –15 %', ecpm: '93,5', fill: '59,5%', revenue: 16.0 },
    { scenario: 'Оба +15 %', ecpm: '126,5', fill: '80,5%', revenue: 29.3 },
];

export const initialQuarterlyForecast = [
    { quarter: "2025-Q1", mau: 320, impressions: 36.9, ecpm: 105, fill: 60, revenue: 9.3, ebitda: -2.7 },
    { quarter: "2025-Q2", mau: 380, impressions: 43.8, ecpm: 110, fill: 65, revenue: 12.4, ebitda: 1.7 },
    { quarter: "2025-Q3", mau: 440, impressions: 50.6, ecpm: 112, fill: 72, revenue: 15.7, ebitda: 7.4 },
    { quarter: "2025-Q4", mau: 500, impressions: 57.6, ecpm: 115, fill: 78, revenue: 19.4, ebitda: 13.1 },
];

export const growthLevers = [
    { id: 'segmentation', lever: "Сегментация аудиторий", effect: "+12.5 ₽ eCPM", type: 'ecpm' as const, value: 12.5 },
    { id: 'native', lever: "Нативные спецпроекты", effect: "+8 ₽ eCPM", type: 'ecpm' as const, value: 8 },
    { id: 'auction', lever: "A/B-аукцион (price-floor)", effect: "+5 ₽ eCPM", type: 'ecpm' as const, value: 5 },
    { id: 'premium', lever: "Премиум-пакет (частота ≤ 3)", effect: "+8% fill", type: 'fill' as const, value: 8 },
    { id: 'api', lever: "API-маркировка РК", effect: "+5% fill", type: 'fill' as const, value: 5 },
];
