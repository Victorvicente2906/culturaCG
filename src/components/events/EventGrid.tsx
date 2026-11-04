import { EventItem } from '../../types';
import EventCard from './EventCard';

export default function EventGrid({ events, categories }: { events: EventItem[]; categories: Array<{ id: string; name: string }> }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => {
        const categoryName = categories.find((category) => category.id === event.categoryId)?.name ?? 'Outros';
        return <EventCard key={event.id} event={event} categoryName={categoryName} />;
      })}
    </div>
  );
}
