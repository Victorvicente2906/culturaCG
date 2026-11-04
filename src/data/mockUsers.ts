import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Administrador',
    email: 'admin@agendaculturalcg.com',
    password: '123456',
    role: 'admin',
    active: true,
  },
  {
    id: 'curator-1',
    name: 'Curador Principal',
    email: 'curador@agendaculturalcg.com',
    password: '123456',
    role: 'curator',
    active: true,
  },
  {
    id: 'organizer-1',
    name: 'Organizador MC',
    email: 'organizador@agendaculturalcg.com',
    password: '123456',
    role: 'organizer',
    active: true,
  },
];
