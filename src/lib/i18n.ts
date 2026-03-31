import "server-only";

import { cookies } from "next/headers";

export const localeCookieName = "site-locale";
export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  ru: {
    header: {
      journal: "Журнал",
      admin: "Админка",
      github: "GitHub"
    },
    footer: {
      label: "Редакционный контрольный центр",
      role: "Креативный инженер"
    },
    hero: {
      label: "Авторский журнал",
      titleMain: "Инженерия",
      titleAccent: "со смыслом.",
      description:
        "Заметки о дизайне, разработке и системной сборке цифровых продуктов без лишнего шума.",
      role: "Креативный инженер",
      scroll: "Листай вниз"
    },
    home: {
      featured: "Главная заметка",
      latest: "Свежие заметки",
      entries: "записей",
      noPublishedTitle: "Опубликованных заметок пока нет",
      noPublishedDescription:
        "Журнал уже подключен. Опубликуй первую заметку из админки.",
      openAdmin: "Открыть админку",
      noRangeTitle: "За этот период заметок нет",
      noRangeDescription:
        "Для выбранного диапазона пока нет опубликованных материалов.",
      allDates: "Все даты"
    },
    post: {
      back: "Назад в журнал",
      note: "Заметка",
      readTime: "мин чтения",
      end: "Конец заметки",
      cta: "Если это откликается, посмотри остальную систему.",
      portfolio: "Открыть портфолио",
      previous: "Предыдущая заметка",
      next: "Следующая заметка"
    },
    notFound: {
      label: "Сигнал потерян",
      description:
        "Эта заметка не существует или маршрут выпал из карты системы.",
      back: "Вернуться в журнал"
    },
    language: {
      label: "Язык",
      ru: "Русский",
      en: "English"
    }
  },
  en: {
    header: {
      journal: "Journal",
      admin: "Admin",
      github: "GitHub"
    },
    footer: {
      label: "Editorial control room",
      role: "Creative engineer"
    },
    hero: {
      label: "Author journal",
      titleMain: "Engineering",
      titleAccent: "with purpose.",
      description:
        "Notes on design, engineering, and the system-level craft of building digital products without noise.",
      role: "Creative engineer",
      scroll: "Scroll to explore"
    },
    home: {
      featured: "Featured note",
      latest: "Latest notes",
      entries: "entries",
      noPublishedTitle: "No published notes yet",
      noPublishedDescription:
        "The journal is connected and ready. Publish the first note from the admin area.",
      openAdmin: "Open admin",
      noRangeTitle: "No notes in this range",
      noRangeDescription:
        "There are no published notes for the selected date range yet.",
      allDates: "All dates"
    },
    post: {
      back: "Back to journal",
      note: "Journal note",
      readTime: "min read",
      end: "End of note",
      cta: "If this resonates, explore the rest of the system.",
      portfolio: "View portfolio",
      previous: "Previous note",
      next: "Next note"
    },
    notFound: {
      label: "Signal lost",
      description:
        "This note does not exist or the route has drifted out of the system map.",
      back: "Back to journal"
    },
    language: {
      label: "Language",
      ru: "Русский",
      en: "English"
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function isLocale(value: string | undefined | null): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function getLocale(): Locale {
  const value = cookies().get(localeCookieName)?.value;
  return isLocale(value) ? value : "ru";
}
