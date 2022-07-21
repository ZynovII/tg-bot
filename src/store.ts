import { isExpired } from './helpers';

const store: { date: Date; users: string[] } = {
  date: new Date(),
  users: [],
};

export const clearStore = () => {
  store.date = new Date();
  store.users = [];
};

export const storeUser = (user: string, date: Date) => {
  if (!store.users.includes(user)) {
    store.users.push(user);
  }
  store.date = date;
};

export const getUsers = () => {
  if (isExpired(store.date)) {
    clearStore();
  }
  return store.users.join('\n');
};
