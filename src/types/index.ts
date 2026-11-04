export type UserRole = 'admin' | 'curator' | 'organizer';
export type EventStatus = 'pending' | 'approved' | 'rejected';

export interface Category {
  id: string;
  name: string;
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  active: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  startDateTime: string;
  endDateTime: string;
  venueName: string;
  address: string;
  images: string[];
  isFree: boolean;
  ticketPrice?: number;
  status: EventStatus;
  rejectionReason?: string;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventFormValues {
  title: string;
  description: string;
  categoryId: string;
  startDateTime: string;
  endDateTime: string;
  venueName: string;
  address: string;
  images: string[];
  isFree: boolean;
  ticketPrice?: string;
}
