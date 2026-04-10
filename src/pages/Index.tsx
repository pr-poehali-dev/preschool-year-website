import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/df6590c4-d3de-4022-a0b8-c2a6433a84e6/bucket/ec0dcd0e-eb13-4e66-8d21-28bbee8b40a4.png";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "news", label: "Новости и события" },
  { id: "contests", label: "Конкурсы и награды" },
  { id: "calendar", label: "Календарь" },
];

const NEWS = [
  {
    id: 1,
    date: "15 января 2025",
    month: "Январь",
    tag: "Открытие",
    title: "Торжественное открытие Года дошкольного образования",
    text: "В Москве состоялась торжественная церемония открытия Года дошкольного образования с участием Министра просвещения России.",
    color: "from-orange-400 to-amber-300",
    emoji: "🎉",
  },
  {
    id: 2,
    date: "3 февраля 2025",
    month: "Февраль",
    tag: "Форум",
    title: "Всероссийский педагогический форум дошкольников",
    text: "Более 2000 педагогов из всех регионов страны обсудили новые стандарты и методики дошкольного воспитания.",
    color: "from-teal-400 to-cyan-300",
    emoji: "📚",
  },
  {
    id: 3,
    date: "20 марта 2025",
    month: "Март",
    tag: "Акция",
    title: "Неделя «Читаем детям» по всей России",
    text: "В рамках года дошкольного образования прошла масштабная акция по продвижению детского чтения в семьях.",
    color: "from-violet-400 to-purple-300",
    emoji: "📖",
  },
  {
    id: 4,
    date: "12 апреля 2025",
    month: "Апрель",
    tag: "Конференция",
    title: "Международная конференция по раннему развитию",
    text: "Эксперты из 15 стран поделились лучшими практиками в области дошкольного образования и раннего развития.",
    color: "from-rose-400 to-pink-300",
    emoji: "🌍",
  },
  {
    id: 5,
    date: "5 мая 2025",
    month: "Май",
    tag: "Праздник",
    title: "День защиты детей — главный праздник года",
    text: "По всей России прошли тысячи мероприятий, приуроченных к главному детскому празднику страны.",
    color: "from-yellow-400 to-orange-300",
    emoji: "☀️",
  },
  {
    id: 6,
    date: "18 июня 2025",
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
    deadline: "Приём заявок: до 1 сентября 2025",
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
    deadline: "Приём заявок: до 15 августа 2025",
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
    deadline: "Приём заявок: до 1 октября 2025",
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
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-300 to-teal-400 opacity-90" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-40 animate-float" />
        <div className="absolute bottom-10 left-10 w-28 h-28 bg-teal-300 rounded-full opacity-40 animate-float" style={{animationDelay: '1.5s'}} />
        <div className="absolute top-40 left-1/4 w-16 h-16 bg-rose-300 rounded-full opacity-50 animate-float" style={{animationDelay: '0.8s'}} />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <span className="text-lg">🇷🇺</span>
              <span className="text-white font-medium text-sm">Официальный портал</span>
            </div>
            <h1 className="font-montserrat font-black text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-fade-in-up delay-100">
              Год<br />дошкольного<br />образования
              <span className="text-amber-200"> 2025</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 animate-fade-in-up delay-200 max-w-xl">
              Вместе создаём счастливое детство для каждого ребёнка России. Новости, события, конкурсы и календарь мероприятий.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300">
              <button
                onClick={() => scrollTo("news")}
                className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Новости и события
              </button>
              <button
                onClick={() => scrollTo("calendar")}
                className="bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full border border-white/40 hover:bg-white/30 transition-all"
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
              <h3 className="font-montserrat font-bold text-xl text-white">{activeMonth} 2025</h3>
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
              <p className="text-background/60 text-sm">© 2025 · Официальный информационный портал</p>
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