/* eslint-disable no-new */
import FavoriteRestaurantIdb from '../../../public/data/favorite-restaurant-idb';
import FavoriteRestaurantView from './favorited-restos/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './favorited-restos/favorite-restaurant-show-presenter';
import FavoriteRestoSearchPresenter from './favorited-restos/favorite-resto-search-presenter';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestos: FavoriteRestaurantIdb });
    new FavoriteRestoSearchPresenter({ view, favoriteRestos: FavoriteRestaurantIdb });
  },
};

export default Favorite;
