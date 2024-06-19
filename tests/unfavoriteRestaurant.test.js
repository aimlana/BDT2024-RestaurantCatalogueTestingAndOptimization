import FavoriteRestaurantIdb from '../src/public/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/tesFactories';

describe('Unliking A Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(async () => {
    addFavoriteButtonContainer();
    await FavoriteRestaurantIdb.putResto({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteResto(1);
  });

  it('should display unfavorite widget when the restaurant has been favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="unfavorite this restaurant"]')).toBeTruthy();
  });

  it('should not display favorite widget when the restaurant has been favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="favorite this restaurant"]')).toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithResto({ id: 1 });
    document
      .querySelector('[aria-label="unfavorite this restaurant"]')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestos()).toEqual([]);
  });

  it('should not throw error when user click unfavorite widget if the unfavorited restaurant is not in the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithResto({ id: 1 });

    await FavoriteRestaurantIdb.deleteResto(1);

    document
      .querySelector('[aria-label="unfavorite this restaurant"]')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestos()).toEqual([]);
  });
});
