import FavoriteButtonInitiator from '../../src/scripts/utils/favorite-button-presenter';
import FavoriteRestaurantIdb from '../../src/public/data/favorite-restaurant-idb';

const createFavoriteButtonPresenterWithResto = async (resto) => {
  await FavoriteButtonInitiator.init({
    favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
    favoriteRestos: FavoriteRestaurantIdb,
    resto,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createFavoriteButtonPresenterWithResto };
