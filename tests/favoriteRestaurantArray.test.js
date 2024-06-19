/* eslint-disable consistent-return */
import { afterEach, describe } from '@jest/globals';
import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';

let favoriteRestos = [];

const FavoriteRestoArray = {
  searchRestos(query) {
    return this.getAllRestos().filter((resto) => {
      const loweredCaserestoTitle = (resto.title || '-').toLowerCase();
      const jammedrestoTitle = loweredCaserestoTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedrestoTitle.indexOf(jammedQuery) !== -1;
    });
  },

  getResto(id) {
    if (!id) {
      return;
    }

    return favoriteRestos.find((resto) => resto.id === id);
  },

  getAllRestos() {
    return favoriteRestos;
  },

  putResto(resto) {
    // eslint-disable-next-line no-prototype-builtins
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    if (this.getResto(resto.id)) {
      return;
    }

    favoriteRestos.push(resto);
  },

  deleteResto(id) {
    favoriteRestos = favoriteRestos.filter((resto) => resto.id !== id);
  },
};

describe('Favorite resto Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestos = [];
  });

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
