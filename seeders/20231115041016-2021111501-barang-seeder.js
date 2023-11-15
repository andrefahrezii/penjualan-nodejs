'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Barangs', [
      { nama: 'Kopi', stok: 190, jumlahTerjual: 0, jenisBarang: 'Konsumsi', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Teh', stok: 181, jumlahTerjual: 0, jenisBarang: 'Konsumsi', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Pasta Gigi', stok: 100, jumlahTerjual: 0, jenisBarang: 'Pembersih', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Sabun Mandi', stok: 100, jumlahTerjual: 0, jenisBarang: 'Pembersih', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Sampo', stok: 100, jumlahTerjual: 0, jenisBarang: 'Pembersih', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Barangs', null, {});
  }
};
