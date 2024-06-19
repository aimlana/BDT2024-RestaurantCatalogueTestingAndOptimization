/* eslint-disable class-methods-use-this */
import FavoriteRestoSearchPresenter from '../src/scripts/view/pages/favorited-restos/favorite-resto-search-presenter';
import FavoriteRestaurantView from '../src/scripts/view/pages/favorited-restos/favorite-restaurant-view';

describe('Searching Restaurants', () => {
  let presenter;
  let favoriteRestos;
  let view;

  const searchRestos = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestos = {
      getAllRestos: jest.fn(),
      searchRestos: jest.fn(),
    };
    presenter = new FavoriteRestoSearchPresenter({
      favoriteRestos,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestos.searchRestos.mockImplementation(() => []);

      searchRestos('resto a');

      expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for favorited restos', () => {
      favoriteRestos.searchRestos.mockImplementation(() => []);

      searchRestos('resto a');

      expect(favoriteRestos.searchRestos).toHaveBeenCalledWith('resto a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restos')
        .addEventListener('restos:updated', () => {
          const restoNames = document.querySelectorAll('.resto__name');
          expect(restoNames.item(0).textContent).toEqual('resto abc');
          expect(restoNames.item(1).textContent).toEqual('ada juga resto abcde');
          expect(restoNames.item(2).textContent).toEqual('ini juga boleh resto a');
          done();
        });

      favoriteRestos.searchRestos.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'ada juga resto abcde' },
            { id: 333, name: 'ini juga boleh resto a' },
          ];
        }
        return [];
      });

      searchRestos('resto a');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document
        .getElementById('restos')
        .addEventListener('restos:updated', () => {
          const restoNames = document.querySelectorAll('.resto__name');
          expect(restoNames.item(0).textContent).toEqual('-');

          done();
        });

      favoriteRestos.searchRestos.mockImplementation((query) => {
        if (query === 'resto a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestos('resto a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestos.getAllRestos.mockImplementation(() => []);

      searchRestos(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestos.getAllRestos.mockImplementation(() => []);

      searchRestos('    ');
      expect(favoriteRestos.getAllRestos).toHaveBeenCalled();
    });
  });

  describe('When no favorite restraurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
          done();
        });
      favoriteRestos.searchRestos.mockImplementation((query) => []);
      searchRestos('resto a');
    });

    it('should not show any restaurant', (done) => {
      document
        .getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(0);
          done();
        });
      favoriteRestos.searchRestos.mockImplementation((query) => []);
      searchRestos('resto a');
    });
  });
});
