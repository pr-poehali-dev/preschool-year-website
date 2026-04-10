import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/df6590c4-d3de-4022-a0b8-c2a6433a84e6/bucket/ec0dcd0e-eb13-4e66-8d21-28bbee8b40a4.png";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "news", label: "Новости и события" },
  { id: "contests", label: "Конкурсы и награды" },
  { id: "calendar", label: "Календарь" },
  { id: "map", label: "Детские сады" },
];

const KINDERGARTENS = [
  { name: 'МБДОУ №1 "Семицветик" (корпус 1)', address: "ул. Пирогова, д. 64", phone: "56-02-28", coords: [52.7290, 41.4610] },
  { name: 'МБДОУ №1 "Семицветик" (корпус 2)', address: "ул. Пролетарская, д. 238", phone: "53-35-51", coords: [52.7145, 41.4540] },
  { name: 'МБДОУ №1 "Семицветик" (корпус 3)', address: "ул. Пролетарская, д. 236", phone: "47-56-87", coords: [52.7148, 41.4535] },
  { name: 'МБДОУ "Детский сад №2 «Алёнушка»"', address: "Рассказовское шоссе, д. 3", phone: "45-88-40", coords: [52.7060, 41.5020] },
  { name: 'МБДОУ №3 "Хрустальный башмачок"', address: "ул. Добролюбова, д. 30", phone: "49-24-97", coords: [52.7350, 41.4480] },
  { name: 'МБДОУ №4 "Непоседы"', address: "п. Строитель, мкр. Центральный, д. 21А", phone: "55-91-31", coords: [52.6940, 41.4120] },
  { name: 'МБДОУ "Детский сад №5 «Звоночек»" (корпус 1)', address: "1 Почтовый проезд, д. 3", phone: "44-44-73", coords: [52.7210, 41.4380] },
  { name: 'МБДОУ "Детский сад №5 «Звоночек»" (корпус 3)', address: "ул. Эскадронная, д. 36", phone: "44-53-59", coords: [52.7170, 41.4260] },
  { name: 'МБДОУ "Детский сад №6 «Машенька»"', address: "п. Строитель, мкр. Северный, д. 28", phone: "77-60-76", coords: [52.6990, 41.4080] },
  { name: 'МБДОУ "Детский сад №7 «Золотая рыбка»"', address: "ул. Рабочая, д. 32", phone: "53-08-93", coords: [52.7240, 41.4710] },
  { name: 'МБДОУ "Детский сад №10 «Малютка»"', address: "ул. Подвойского, д. 10", phone: "53-76-10", coords: [52.7310, 41.4640] },
  { name: 'МБДОУ "Детский сад №12 «Звёздный»"', address: "ул. 60 лет Октября, д. 10", phone: "72-53-25", coords: [52.7400, 41.4560] },
  { name: 'МБДОУ "Детский сад №18 «Ручеёк»"', address: "ул. Фридриха Энгельса, д. 10", phone: "71-43-09", coords: [52.7460, 41.4320] },
  { name: 'МБДОУ "Детский сад №24 «Сказка»"', address: "ул. Мичуринская, д. 183", phone: "51-77-60", coords: [52.7080, 41.4870] },
  { name: 'МБДОУ "Детский сад №25 «Журавлик»"', address: "ул. Магистральная, д. 21", phone: "51-33-16", coords: [52.7130, 41.4780] },
  { name: 'МБДОУ "Детский сад №28 «Золотой петушок»"', address: "ул. Куйбышева, д. 14а", phone: "72-91-40", coords: [52.7480, 41.4410] },
  { name: 'МБДОУ "Детский сад №32 «Ромашка»"', address: "ул. Дмитрия Карбышева, д. 1", phone: "47-78-52", coords: [52.7380, 41.4200] },
  { name: 'МБДОУ "Детский сад №33 «Клубничка»" (корпус 1)', address: "ул. Серпуховская, д. 5", phone: "49-30-34", coords: [52.7260, 41.4430] },
  { name: 'МБДОУ "Детский сад №33 «Клубничка»" (корпус 2)', address: "Рубежный проезд, д. 16", phone: "44-13-41", coords: [52.7200, 41.4350] },
  { name: 'МБДОУ "Детский сад №38 «Апельсин»" (корпус 1)', address: "ул. Лесная, д. 27", phone: "44-00-79", coords: [52.7190, 41.4290] },
  { name: 'МБДОУ "Детский сад №38 «Апельсин»" (корпус 2)', address: "ул. Лесная, д. 29", phone: "44-33-44", coords: [52.7185, 41.4285] },
  { name: 'МБДОУ "Детский сад №40 «Русалочка»" (корпус 1)', address: "ул. Мичуринская, д. 105", phone: "53-05-50", coords: [52.7115, 41.4820] },
  { name: 'МБДОУ "Детский сад №40 «Русалочка»" (корпус 2)', address: "ул. Маяковского, д. 6", phone: "53-02-58", coords: [52.7270, 41.4760] },
  { name: 'МБДОУ "Детский сад №40 «Русалочка»" (корпус 3)', address: "ул. Мичуринская, д. 68", phone: "53-58-62", coords: [52.7150, 41.4860] },
  { name: 'МБДОУ "Детский сад №43 «Яблонька»"', address: "ул. Сергея Рахманинова, д. 3в", phone: "72-53-92", coords: [52.7500, 41.4380] },
  { name: 'МБДОУ "Детский сад №44 «Белоснежка»" (корпус 1)', address: "ул. Пионерская, д. 7", phone: "72-02-19", coords: [52.7530, 41.4450] },
  { name: 'МБДОУ "Детский сад №44 «Белоснежка»" (корпус 2)', address: "ул. Андреевская, д. 39", phone: "72-08-02", coords: [52.7560, 41.4390] },
  { name: 'МБДОУ №45 "Буратино"', address: "б. Энтузиастов, д. 30", phone: "53-05-29", coords: [52.7240, 41.4680] },
  { name: 'МБДОУ "Детский сад №47 «Лучик»"', address: "ул. Физкультурников, д. 14", phone: "49-36-17", coords: [52.7330, 41.4390] },
  { name: 'МБДОУ "Детский сад №48 «Пчёлка»"', address: "ул. Майская, д. 35", phone: "44-15-46", coords: [52.7230, 41.4310] },
  { name: 'МБДОУ "Детский сад №51 «Красная шапочка»"', address: "ул. Колхозная, д. 93", phone: "53-34-78", coords: [52.7090, 41.4600] },
  { name: 'МБДОУ "Детский сад №52 «Маячок»"', address: "ул. Социалистическая, д. 1б", phone: "56-26-55", coords: [52.7300, 41.4520] },
  { name: 'МБДОУ "Детский сад №53 «Ёлочка»" (корпус 1)', address: "ул. Н. Вирты, д. 94", phone: "56-43-00", coords: [52.7160, 41.4650] },
  { name: 'МБДОУ "Детский сад №53 «Ёлочка»" (корпус 2)', address: "ул. Н. Вирты, д. 102", phone: "51-27-80", coords: [52.7155, 41.4660] },
  { name: 'МБДОУ №54 "Аленький цветочек"', address: "ул. Рылеева, д. 92", phone: "58-06-90", coords: [52.7430, 41.4470] },
  { name: 'МБДОУ "Детский сад №56 «Гусельки»"', address: "ул. Н. Вирты, д. 104а", phone: "53-27-51", coords: [52.7153, 41.4665] },
  { name: 'МБДОУ №57 "Катюша"', address: "ул. Н. Вирты, д. 106а", phone: "45-49-15", coords: [52.7150, 41.4670] },
  { name: 'МБДОУ "Детский сад №59 «Ягодка»"', address: "ул. Кронштадтская, д. 90", phone: "72-27-19", coords: [52.7510, 41.4300] },
  { name: 'МБДОУ №60 "Заинька"', address: "ул. Клубная, д. 11", phone: "75-86-14", coords: [52.7550, 41.4250] },
  { name: 'МБДОУ "Детский сад №62 «Огонёк»"', address: "б. Энтузиастов, д. 2в", phone: "53-70-30", coords: [52.7250, 41.4690] },
  { name: 'МБДОУ №66 "Тополёк"', address: "ул. Полынковская, д. 53", phone: "44-29-40", coords: [52.7180, 41.4220] },
  { name: 'МБДОУ №67 "Улыбка"', address: "ул. Студенецкая набережная, д. 35", phone: "48-52-23", coords: [52.7370, 41.4560] },
  { name: 'МБДОУ "Детский сад №68 «Светлячок»"', address: "ул. 2-й Авиационный проезд, д. 14а", phone: "44-73-73", coords: [52.7140, 41.4300] },
  { name: 'МБДОУ №68 "Яблонька"', address: "ул. Планировочная, д. 2а", phone: "45-28-41", coords: [52.7050, 41.4500] },
  { name: 'МБДОУ "Детский сад №69 «Мальвина»"', address: "ул. Магистральная, д. 7", phone: "51-31-58", coords: [52.7125, 41.4775] },
  { name: 'МБДОУ "Детский сад №70"', address: "ул. Куйбышева, д. 48", phone: "75-61-45", coords: [52.7470, 41.4440] },
  { name: 'МБДОУ №71 "Незабудка"', address: "ул. Пензенская, д. 69", phone: "47-05-92", coords: [52.7340, 41.4150] },
  { name: 'МБДОУ "Акварелька"', address: "ул. Агапкина, д. 4д", phone: "49-27-35", coords: [52.7320, 41.4440] },
  { name: 'МБДОУ "Детский сад «Берёзка»" (корпус 1)', address: "ул. Августа Бебеля, д. 4а", phone: "71-12-31", coords: [52.7440, 41.4340] },
  { name: 'МБДОУ "Детский сад «Берёзка»" (корпус 2)', address: "ул. Сергеева-Ценского, д. 29а", phone: "72-11-23", coords: [52.7460, 41.4360] },
  { name: 'МБДОУ "Василёк"', address: "п. Строитель, ул. Дорожно-Строительная, д. 50Б", phone: "77-67-35", coords: [52.6960, 41.4100] },
  { name: 'МБДОУ "Винни-Пух"', address: "проезд Проектный, д. 5", phone: "49-26-53", coords: [52.7280, 41.4410] },
  { name: 'МБДОУ "Детский сад «Возрождение»" (корпус 1)', address: "Первомайская пл., д. 15", phone: "75-59-09", coords: [52.7350, 41.4620] },
  { name: 'МБДОУ "Детский сад «Возрождение»" (корпус 2)', address: "ул. Советская, д. 198в", phone: "—", coords: [52.7360, 41.4600] },
  { name: 'МБДОУ "Волшебная страна"', address: "проезд Запрудный, д. 3", phone: "49-23-94", coords: [52.7360, 41.4480] },
  { name: 'МБДОУ "Дюймовочка"', address: "ул. Киквидзе, д. 73г", phone: "49-34-06", coords: [52.7290, 41.4380] },
  { name: 'МБДОУ "Жемчужинка"', address: "тер. Тамбов-4, д. 10а", phone: "73-55-08", coords: [52.7600, 41.4550] },
  { name: 'МБДОУ "Журавлик"', address: "с. Покрово-Пригородное, ул. Пионерская, д. 12а", phone: "65-07-82", coords: [52.7010, 41.4400] },
  { name: 'МБДОУ "Детский сад «Золотой ключик»"', address: "ул. Пензенская, д. 26", phone: "56-14-23", coords: [52.7355, 41.4160] },
  { name: 'МБДОУ "Детский сад «Золушка»"', address: "ул. Пирогова, д. 56", phone: "53-39-79", coords: [52.7295, 41.4605] },
  { name: 'МБДОУ "Ивушка"', address: "ул. Кирова, д. 42", phone: "71-01-20", coords: [52.7450, 41.4280] },
  { name: 'МБДОУ "Изумрудный город"', address: "ул. М. Мордасовой, д. 31", phone: "49-32-13", coords: [52.7310, 41.4490] },
  { name: 'МБДОУ "Колобок"', address: "п. Строитель, мкр. Центральный, д. 17", phone: "77-75-88", coords: [52.6945, 41.4115] },
  { name: 'МБДОУ "Колокольчик"', address: "с. Бокино, ул. Дорожная, д. 1а", phone: "65-66-36", coords: [52.7650, 41.5200] },
  { name: 'МБДОУ "Колосок"', address: "п. Строитель, мкр. Северный, д. 10", phone: "77-78-32", coords: [52.6985, 41.4090] },
  { name: 'МБДОУ "Машенька"', address: "ул. Сабуровская, д. 1д", phone: "49-31-75", coords: [52.7300, 41.4460] },
  { name: 'МБДОУ "Медвежонок"', address: "ул. Селезнёвая, д. 2д", phone: "49-48-29", coords: [52.7220, 41.4480] },
  { name: 'МБДОУ "Непоседы"', address: "с. Бокино, пер. Дорожный, д. 22", phone: "61-34-17", coords: [52.7660, 41.5210] },
  { name: 'МБДОУ "Подснежник"', address: "ул. Астраханская, д. 281", phone: "49-43-50", coords: [52.7100, 41.4550] },
  { name: 'МБДОУ "Подсолнух"', address: "ул. Свободная, д. 14а", phone: "49-32-09", coords: [52.7255, 41.4470] },
  { name: 'МБДОУ "Детский сад «Радуга»"', address: "ул. Магистральная, д. 122", phone: "51-85-07", coords: [52.7070, 41.4900] },
  { name: 'МБДОУ "Детский сад «Родничок»"', address: "ул. Н. Вирты, д. 118", phone: "53-07-00", coords: [52.7148, 41.4680] },
  { name: 'МБДОУ "Детский сад «Росиночка»"', address: "ул. Социалистическая, д. 7", phone: "53-45-61", coords: [52.7295, 41.4530] },
  { name: 'МБДОУ "Солнышко"', address: "ул. Свободная, д. 8а", phone: "49-21-85", coords: [52.7258, 41.4465] },
  { name: 'МБДОУ "Умка"', address: "ул. Победы, д. 6а", phone: "77-20-24", coords: [52.6970, 41.4130] },
  { name: 'МБДОУ "Детский сад «Эврика»" (корпус 1)', address: "пр. Н. Островского, д. 8а", phone: "44-04-06", coords: [52.7175, 41.4340] },
  { name: 'МБДОУ "Детский сад «Эврика»" (корпус 2)', address: "пр. Достоевского, д. 66", phone: "73-44-96", coords: [52.7420, 41.4250] },
];

const NEWS = [
  {
    id: 1,
    date: "15 января 2026",
    month: "Январь",
    tag: "Открытие",
    title: "Торжественное открытие Года дошкольного образования",
    text: "В Москве состоялась торжественная церемония открытия Года дошкольного образования с участием Министра просвещения России.",
    color: "from-orange-400 to-amber-300",
    emoji: "🎉",
  },
  {
    id: 2,
    date: "3 февраля 2026",
    month: "Февраль",
    tag: "Форум",
    title: "Всероссийский педагогический форум дошкольников",
    text: "Более 2000 педагогов из всех регионов страны обсудили новые стандарты и методики дошкольного воспитания.",
    color: "from-teal-400 to-cyan-300",
    emoji: "📚",
  },
  {
    id: 3,
    date: "20 марта 2026",
    month: "Март",
    tag: "Акция",
    title: "Неделя «Читаем детям» по всей России",
    text: "В рамках года дошкольного образования прошла масштабная акция по продвижению детского чтения в семьях.",
    color: "from-violet-400 to-purple-300",
    emoji: "📖",
  },
  {
    id: 4,
    date: "12 апреля 2026",
    month: "Апрель",
    tag: "Конференция",
    title: "Международная конференция по раннему развитию",
    text: "Эксперты из 15 стран поделились лучшими практиками в области дошкольного образования и раннего развития.",
    color: "from-rose-400 to-pink-300",
    emoji: "🌍",
  },
  {
    id: 5,
    date: "5 мая 2026",
    month: "Май",
    tag: "Праздник",
    title: "День защиты детей — главный праздник года",
    text: "По всей России прошли тысячи мероприятий, приуроченных к главному детскому празднику страны.",
    color: "from-yellow-400 to-orange-300",
    emoji: "☀️",
  },
  {
    id: 6,
    date: "18 июня 2026",
    month: "Июнь",
    tag: "Выставка",
    title: "Выставка детского творчества «Мир глазами ребёнка»",
    text: "Более 10 000 работ маленьких художников из всех регионов страны были представлены в Москве.",
    color: "from-green-400 to-emerald-300",
    emoji: "🎨",
  },
];

const CONTESTS = [
  {
    title: "«Воспитатель года России»",
    desc: "Главный профессиональный конкурс педагогов дошкольного образования страны",
    prize: "Гран-при + 500 000 ₽",
    emoji: "🏆",
    color: "bg-amber-400",
    textColor: "text-amber-700",
    bgLight: "bg-amber-50",
    deadline: "Приём заявок: до 1 сентября 2026",
    nominations: ["Лучший воспитатель", "Инновационный подход", "Лучшая группа"],
  },
  {
    title: "«Детский сад года»",
    desc: "Конкурс лучших дошкольных учреждений по развитию образовательной среды",
    prize: "1 место + 2 000 000 ₽",
    emoji: "🏫",
    color: "bg-teal-400",
    textColor: "text-teal-700",
    bgLight: "bg-teal-50",
    deadline: "Приём заявок: до 15 августа 2026",
    nominations: ["Лучшая среда", "Инклюзия", "Цифровизация"],
  },
  {
    title: "«Юные таланты»",
    desc: "Всероссийский конкурс детских творческих работ для воспитанников садов",
    prize: "Дипломы + подарки",
    emoji: "🌟",
    color: "bg-violet-400",
    textColor: "text-violet-700",
    bgLight: "bg-violet-50",
    deadline: "Приём работ: круглогодично",
    nominations: ["Рисунок", "Лепка", "Музыка", "Театр"],
  },
  {
    title: "«Родители и дети»",
    desc: "Конкурс семейных проектов по развитию дошкольного образования в регионах",
    prize: "Путёвки + дипломы",
    emoji: "👨‍👩‍👧‍👦",
    color: "bg-rose-400",
    textColor: "text-rose-700",
    bgLight: "bg-rose-50",
    deadline: "Приём заявок: до 1 октября 2026",
    nominations: ["Лучший семейный проект", "Активная семья"],
  },
];

const CALENDAR_EVENTS: Record<string, { day: number; title: string; type: string }[]> = {
  "Январь": [
    { day: 1, title: "Старт Года дошкольного образования", type: "highlight" },
    { day: 15, title: "Торжественное открытие", type: "event" },
    { day: 25, title: "Семинар для методистов", type: "seminar" },
  ],
  "Февраль": [
    { day: 3, title: "Всероссийский педфорум", type: "event" },
    { day: 14, title: "Праздник любви к чтению", type: "holiday" },
    { day: 22, title: "Вебинар по ФГОС ДО", type: "seminar" },
  ],
  "Март": [
    { day: 1, title: "Старт акции «Читаем детям»", type: "event" },
    { day: 8, title: "Праздник 8 Марта", type: "holiday" },
    { day: 20, title: "День земли — экоурок в садах", type: "event" },
  ],
  "Апрель": [
    { day: 1, title: "Всемирный день смеха в садах", type: "holiday" },
    { day: 12, title: "Международная конференция", type: "event" },
    { day: 22, title: "День Земли — акция", type: "seminar" },
  ],
  "Май": [
    { day: 1, title: "Праздник труда", type: "holiday" },
    { day: 9, title: "День Победы — патриотические уроки", type: "holiday" },
    { day: 27, title: "Финал конкурса «Воспитатель года»", type: "highlight" },
  ],
  "Июнь": [
    { day: 1, title: "День защиты детей 🎈", type: "highlight" },
    { day: 12, title: "День России — праздник", type: "holiday" },
    { day: 18, title: "Открытие выставки творчества", type: "event" },
  ],
  "Июль": [
    { day: 8, title: "День семьи, любви и верности", type: "holiday" },
    { day: 15, title: "Летний фестиваль в садах", type: "event" },
    { day: 28, title: "Слёт вожатых", type: "seminar" },
  ],
  "Август": [
    { day: 22, title: "День государственного флага", type: "holiday" },
    { day: 25, title: "Подготовка к учебному году", type: "seminar" },
    { day: 30, title: "Праздник «До свидания, лето!»", type: "event" },
  ],
  "Сентябрь": [
    { day: 1, title: "День знаний", type: "highlight" },
    { day: 10, title: "Всероссийский открытый урок", type: "event" },
    { day: 27, title: "День воспитателя 🌟", type: "highlight" },
  ],
  "Октябрь": [
    { day: 5, title: "Всемирный день учителя", type: "holiday" },
    { day: 15, title: "Региональные конкурсы", type: "seminar" },
    { day: 25, title: "Форум директоров ДОУ", type: "event" },
  ],
  "Ноябрь": [
    { day: 4, title: "День народного единства", type: "holiday" },
    { day: 14, title: "Неделя инклюзивного образования", type: "event" },
    { day: 20, title: "Всемирный день ребёнка", type: "highlight" },
  ],
  "Декабрь": [
    { day: 5, title: "День добровольца", type: "holiday" },
    { day: 20, title: "Торжественное закрытие года", type: "highlight" },
    { day: 31, title: "Новогодние праздники", type: "holiday" },
  ],
};

const MONTHS = Object.keys(CALENDAR_EVENTS);

const EVENT_TYPES: Record<string, { label: string; color: string; dot: string }> = {
  highlight: { label: "Ключевое", color: "bg-orange-100 text-orange-700 border border-orange-300", dot: "bg-orange-500" },
  event: { label: "Событие", color: "bg-teal-100 text-teal-700 border border-teal-300", dot: "bg-teal-500" },
  seminar: { label: "Семинар", color: "bg-violet-100 text-violet-700 border border-violet-300", dot: "bg-violet-500" },
  holiday: { label: "Праздник", color: "bg-amber-100 text-amber-700 border border-amber-300", dot: "bg-amber-500" },
};

const STATS = [
  { value: "47 000+", label: "Детских садов", emoji: "🏫" },
  { value: "8 млн", label: "Воспитанников", emoji: "👶" },
  { value: "600 000+", label: "Педагогов", emoji: "👩‍🏫" },
  { value: "85", label: "Регионов участвует", emoji: "🗺️" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeMonth, setActiveMonth] = useState("Сентябрь");
  const [newsFilter, setNewsFilter] = useState("Все");
  const [selectedKg, setSelectedKg] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ymapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const init = () => {
      if (ymapRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ymaps = (window as any).ymaps;
      if (!ymaps) return;
      ymaps.ready(() => {
        const map = new ymaps.Map(mapRef.current, {
          center: [52.7212, 41.4523],
          zoom: 13,
          controls: ["zoomControl", "fullscreenControl"],
        });
        ymapRef.current = map;
        KINDERGARTENS.forEach((kg, i) => {
          const placemark = new ymaps.Placemark(
            kg.coords,
            { balloonContentHeader: kg.name, balloonContentBody: `<b>Адрес:</b> ${kg.address}<br/><b>Телефон:</b> ${kg.phone}` },
            { preset: "islands#blueEducationIcon" }
          );
          placemark.events.add("click", () => setSelectedKg(i));
          map.geoObjects.add(placemark);
        });
      });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).ymaps) { init(); } else {
      const interval = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).ymaps) { clearInterval(interval); init(); }
      }, 300);
    }
    return () => { ymapRef.current?.destroy(); ymapRef.current = null; };
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredNews = newsFilter === "Все" ? NEWS : NEWS.filter(n => n.month === newsFilter);
  const newsMonths = ["Все", ...Array.from(new Set(NEWS.map(n => n.month)))];

  return (
    <div className="min-h-screen font-golos bg-background">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/projects/df6590c4-d3de-4022-a0b8-c2a6433a84e6/bucket/24ba0be3-82b9-40bd-9623-7a55a0cd00d6.png"
              alt="Год дошкольного образования"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="md:hidden flex gap-1">
            {NAV_ITEMS.slice(1).map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-foreground"
              >
                {item.label === "Новости и события" ? "Новости" : item.label === "Конкурсы и награды" ? "Конкурсы" : item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-blue-600/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-lg">🇷🇺</span>
                <span className="text-blue-700 font-medium text-sm">Официальный портал</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-pink-100 rounded-full px-4 py-2">
                <span className="text-lg">📍</span>
                <span className="text-pink-700 font-semibold text-sm">город Тамбов</span>
              </div>
            </div>
            <h1 className="font-montserrat font-black text-4xl md:text-6xl lg:text-7xl text-blue-700 leading-tight mb-6 animate-fade-in-up delay-100">
              Год<br />дошкольного<br />образования
              <span className="text-pink-500"> 2026</span>
            </h1>
            <p className="text-foreground/80 text-lg md:text-xl leading-relaxed mb-8 animate-fade-in-up delay-200 max-w-xl">
              Тамбов вместе со всей страной создаёт счастливое детство для каждого ребёнка. Новости, события, конкурсы и календарь мероприятий.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300">
              <button
                onClick={() => scrollTo("news")}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Новости и события
              </button>
              <button
                onClick={() => scrollTo("calendar")}
                className="bg-white/70 backdrop-blur-sm text-blue-700 font-semibold px-6 py-3 rounded-full border border-blue-200 hover:bg-white transition-all"
              >
                📅 Календарь
              </button>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="relative h-16 md:h-24">
          <svg viewBox="0 0 1440 96" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0,96 C360,0 1080,96 1440,0 L1440,96 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-border card-hover animate-pop-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-2">{s.emoji}</div>
                <div className="font-montserrat font-black text-2xl md:text-3xl text-primary">{s.value}</div>
                <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Icon name="Newspaper" size={16} />
              Новости и события
            </div>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-foreground">
              Год в <span className="text-primary">действии</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">Главные события Года дошкольного образования</p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {newsMonths.map(m => (
              <button
                key={m}
                onClick={() => setNewsFilter(m)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  newsFilter === m
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-foreground border border-border hover:border-primary/50"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border card-hover">
                <div className={`bg-gradient-to-br ${news.color} p-8 flex items-center justify-center`}>
                  <span className="text-6xl">{news.emoji}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full font-medium">{news.tag}</span>
                    <span className="text-muted-foreground text-xs">{news.date}</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-base text-foreground mb-2 leading-snug">{news.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{news.text}</p>
                  <button className="mt-4 text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Читать далее <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTESTS */}
      <section id="contests" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Icon name="Trophy" size={16} />
              Конкурсы и награды
            </div>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-foreground">
              Признание <span className="text-amber-500">лучших</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">Конкурсы для педагогов, учреждений и семей</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {CONTESTS.map((contest, i) => (
              <div key={i} className={`${contest.bgLight} rounded-3xl p-6 border border-border card-hover`}>
                <div className="flex items-start gap-4">
                  <div className={`${contest.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md flex-shrink-0`}>
                    {contest.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-montserrat font-bold text-lg ${contest.textColor} mb-1`}>{contest.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{contest.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {contest.nominations.map((nom, j) => (
                        <span key={j} className="bg-white text-foreground text-xs px-2.5 py-1 rounded-full border border-border">
                          {nom}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs text-muted-foreground">{contest.deadline}</span>
                      <span className={`font-bold text-sm ${contest.textColor}`}>{contest.prize}</span>
                    </div>
                  </div>
                </div>
                <button className={`mt-4 w-full py-2.5 rounded-xl font-semibold text-sm ${contest.color} text-white hover:opacity-90 transition-opacity shadow-sm`}>
                  Подать заявку
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <section id="calendar" className="py-16 bg-gradient-to-br from-teal-50 via-background to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-600 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Icon name="Calendar" size={16} />
              Интерактивный календарь
            </div>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-foreground">
              Мероприятия <span className="text-teal-500">года</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">Нажмите на месяц, чтобы увидеть события</p>
          </div>

          {/* Month selector */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-8">
            {MONTHS.map((month) => (
              <button
                key={month}
                onClick={() => setActiveMonth(month)}
                className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                  activeMonth === month
                    ? "bg-teal-500 text-white shadow-lg scale-105"
                    : "bg-white text-foreground border border-border hover:border-teal-300"
                }`}
              >
                {month}
              </button>
            ))}
          </div>

          {/* Events for selected month */}
          <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-teal-400 to-cyan-400 px-6 py-4 flex items-center justify-between">
              <h3 className="font-montserrat font-bold text-xl text-white">{activeMonth} 2026</h3>
              <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                {CALENDAR_EVENTS[activeMonth]?.length} события
              </span>
            </div>

            <div className="divide-y divide-border">
              {CALENDAR_EVENTS[activeMonth]?.map((ev, i) => {
                const typeInfo = EVENT_TYPES[ev.type];
                return (
                  <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
                    <div className="w-10 h-10 bg-teal-50 border-2 border-teal-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-montserrat font-bold text-teal-600 text-sm">{ev.day}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm md:text-base">{ev.title}</p>
                    </div>
                    <span className={`hidden sm:block text-xs px-2.5 py-1 rounded-full font-medium ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                    <div className={`sm:hidden w-2.5 h-2.5 rounded-full flex-shrink-0 ${typeInfo.dot}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {Object.entries(EVENT_TYPES).map(([, info]) => (
              <div key={info.label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${info.dot}`} />
                <span className="text-xs text-muted-foreground">{info.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Icon name="MapPin" size={16} />
              Детские сады Тамбова
            </div>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-foreground">
              Найди <span className="text-blue-600">ближайший сад</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">Все муниципальные дошкольные учреждения города на карте</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Список */}
            <div className="lg:col-span-1 space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {KINDERGARTENS.map((kg, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedKg(i)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedKg === i
                      ? "bg-blue-50 border-blue-400 shadow-md"
                      : "bg-white border-border hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-montserrat font-bold text-sm ${
                      selectedKg === i ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
                    }`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground leading-snug">{kg.name}</p>
                      <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                        <Icon name="MapPin" size={11} /> {kg.address}
                      </p>
                      <p className="text-muted-foreground text-xs flex items-center gap-1">
                        <Icon name="Phone" size={11} /> {kg.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Карта */}
            <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-md border border-border" style={{ height: 520 }}>
              <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            </div>
          </div>

          {selectedKg !== null && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏫</span>
              </div>
              <div>
                <p className="font-montserrat font-bold text-blue-700">{KINDERGARTENS[selectedKg].name}</p>
                <p className="text-sm text-muted-foreground">{KINDERGARTENS[selectedKg].address} · {KINDERGARTENS[selectedKg].phone}</p>
              </div>
              <button onClick={() => setSelectedKg(null)} className="ml-auto text-muted-foreground hover:text-foreground">
                <Icon name="X" size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="https://cdn.poehali.dev/projects/df6590c4-d3de-4022-a0b8-c2a6433a84e6/bucket/24ba0be3-82b9-40bd-9623-7a55a0cd00d6.png"
                  alt="Год дошкольного образования"
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-background/60 text-sm">© 2026 · Официальный информационный портал · Тамбов</p>
            </div>
            <div className="flex gap-6 text-sm text-background/70">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="hover:text-background transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}