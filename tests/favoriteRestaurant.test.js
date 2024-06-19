import FavoriteRestaurantIdb from '../src/public/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/tesFactories';

describe('Liking A Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithResto({ id: 1 });
    expect(document.querySelector('[aria-label="favorite this restaurant"]')).toBeTruthy();
  });

  it('should not show the unfavorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithResto({ id: 1 });
    expect(document.querySelector('[aria-label="unfavorite this restaurant"]')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithResto({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    const resto = await FavoriteRestaurantIdb.getResto(1);

    expect(resto).toEqual({ id: 1 });
    await FavoriteRestaurantIdb.deleteResto(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithResto({ id: 1 });
    await FavoriteRestaurantIdb.putResto({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestos()).toEqual([{ id: 1 }]);
    await FavoriteRestaurantIdb.deleteResto(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithResto({});

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestos()).toEqual([]);
  });
});
