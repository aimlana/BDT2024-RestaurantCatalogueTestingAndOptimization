/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
import { openDB } from 'idb';
import CONFIG from '../../scripts/global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getResto(id) {
    if (!id) {
      return;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestos() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putResto(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, resto);
  },
  async deleteResto(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  async searchRestos(query) {
    return (await this.getAllRestos()).filter((resto) => {
      const loweredCaserestoTitle = (resto.title || '-').toLowerCase();
      const jammedrestoTitle = loweredCaserestoTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedrestoTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

export default FavoriteRestaurantIdb;
