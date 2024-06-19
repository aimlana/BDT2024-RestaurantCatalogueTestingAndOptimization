/* eslint-disable no-new */
import FavoriteRestaurantView from '../src/scripts/view/pages/favorited-restos/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/view/pages/favorited-restos/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };
  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been favorited', () => {
    it('should render the information that no restaurants have been favorited', () => {
      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestos,
      });

      const restos = [];
      presenter._displayRestos(restos);

      expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
    });

    it('should ask for the favorite restos', () => {
      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestos,
      });

      expect(favoriteRestos.getAllRestos).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been favorited', (done) => {
      document
        .getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
          done();
        });

      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestos,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should render the restaurants', () => {
      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestos,
      });

      presenter._displayRestos([
        {
          id: 11,
          name: 'A',
          rating: 3,
          description: 'Sebuah resto A',
        },
        {
          id: 22,
          name: 'B',
          rating: 4,
          description: 'Sebuah resto B',
        },
      ]);

      expect(document.querySelectorAll('.resto-item').length).toEqual(2);
    });

    it('should show the restaurants', (done) => {
      document
        .getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(2);

          done();
        });
      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: 'A',
            rating: 3,
            description: 'Sebuah resto A',
          },
          {
            id: 22,
            name: 'B',
            rating: 4,
            description: 'Sebuah resto B',
          },
        ]),
      };
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestos,
      });
    });
  });
});
