import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { mockCategories } from '../data/mockCategories';
import { mockEvents } from '../data/mockEvents';
import { Category, EventItem } from '../types';

interface EventsContextValue {
  categories: Category[];
  events: EventItem[];
  addEvent: (event: EventItem) => void;
  updateEvent: (event: EventItem) => void;
  setEvents: (events: EventItem[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  getCategoryName: (categoryId: string) => string;
}

const EVENTS_KEY = 'agenda-cultural-cg-events';
const CATEGORIES_KEY = 'agenda-cultural-cg-categories';

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEventsState] = useState<EventItem[]>(() => {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as EventItem[];
      } catch {
        localStorage.removeItem(EVENTS_KEY);
      }
    }
    return mockEvents;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as Category[];
      } catch {
        localStorage.removeItem(CATEGORIES_KEY);
      }
    }
    return mockCategories;
  });

  useEffect(() => {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  const addEvent = (event: EventItem) => {
    setEventsState((current) => [event, ...current]);
  };

  const updateEvent = (updated: EventItem) => {
    setEventsState((current) => current.map((item) => (item.id === updated.id ? updated : item)));
  };

  const addCategory = (category: Category) => {
    setCategories((current) => [category, ...current]);
  };

  const updateCategory = (updated: Category) => {
    setCategories((current) => current.map((item) => (item.id === updated.id ? updated : item)));
  };

  const getCategoryName = (categoryId: string) => categories.find((item) => item.id === categoryId)?.name ?? 'Outros';

  const value = useMemo<EventsContextValue>(
    () => ({
      categories,
      events,
      addEvent,
      updateEvent,
      setEvents: setEventsState,
      addCategory,
      updateCategory,
      getCategoryName,
    }),
    [categories, events],
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error('useEvents must be used within EventsProvider');
  }

  return context;
}
