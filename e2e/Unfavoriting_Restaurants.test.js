/* eslint-disable no-plusplus */
const assert = require('assert');

Feature('Unfavoriting Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('unfavoriting a restaurant', async ({ I }) => {
  // Buka halaman utama
  I.amOnPage('/');

  // Pilih salah satu resto. Misalnya resto pertama
  I.seeElement('.resto-item a');
  const firstResto = locate('.resto-item a').first();
  const firstRestoName = await I.grabTextFrom(locate('.resto__name').first());
  I.click(firstResto);

  // Aplikasi membawa user ke halaman detail resto
  I.seeElement('#favoriteButton');

  // Kita menekan tombol menyukai resto
  I.click('#favoriteButton');

  // Kita buka halaman daftar resto yang disukai
  I.amOnPage('/#/favorite');

  // Kita melihat satu resto yang telah disukai
  I.seeElement('.resto-item');
  const favoritedRestoName = await I.grabTextFrom('.resto__name');
  assert.strictEqual(firstRestoName, favoritedRestoName);

  // Klik resto tersebut
  I.click('.resto-item a');

  // Aplikasi membawa user ke halaman detail resto
  I.seeElement('#favoriteButton');

  // Kita menekan tombol batal menyukai resto
  I.click('#favoriteButton');

  // Kita buka halaman daftar resto yang disukai
  I.amOnPage('/#/favorite');

  // Kita tidak melihat resto yang disukai lagi
  I.see('Tidak ada restoran untuk ditampilkan', '.resto-item__not__found');
});
