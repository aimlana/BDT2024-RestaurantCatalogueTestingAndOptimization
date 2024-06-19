/* eslint-disable no-plusplus */
const assert = require('assert');

Feature('Favoriting Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restoran untuk ditampilkan', '.resto-item__not__found');
});

Scenario('favoriting one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.resto-item a');
  const firstResto = locate('.resto__name').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(locate('.resto-item a').first());

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-item');
  const favoritedRestoTitle = await I.grabTextFrom('.resto__name');

  assert.strictEqual(firstRestoName, favoritedRestoTitle);
});

Scenario('searching restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.resto-item a');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.resto-item a').at(i));
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');
    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.resto__name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedRestoss = await I.grabNumberOfVisibleElements('.resto-item');
  assert.strictEqual(titles.length, visibleLikedRestoss);

  const searchQuery = titles[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const matchingRestos = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedRestos = await I.grabNumberOfVisibleElements('.resto-item');
  assert.strictEqual(matchingRestos.length, visibleSearchedLikedRestos);

  for (let i = 0; i < matchingRestos.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = (await I.grabTextFrom(locate('.resto__name').at(i + 1))).trim();
    assert.strictEqual(matchingRestos[i].trim(), visibleTitle);
  }
});
