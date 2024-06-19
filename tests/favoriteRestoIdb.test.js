import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';
import FavoriteRestaurantIdb from '../src/public/data/favorite-restaurant-idb';

describe('Favorite Resto Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestos()).forEach(async (Resto) => {
      await FavoriteRestaurantIdb.deleteResto(Resto.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteRestaurantIdb);
});
