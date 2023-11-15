'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Penjualans', [
            { jumlah: 25, totalHarga: 100, tanggalPenjualan: "2021-05-01", BarangId: 1, createdAt: new Date(), updatedAt: new Date() },
            { jumlah: 19, totalHarga: 190, tanggalPenjualan: "2021-05-01", BarangId: 2, createdAt: new Date(), updatedAt: new Date() },
            { jumlah: 20, totalHarga: 200, tanggalPenjualan: "2021-05-11 ", BarangId: 3, createdAt: new Date(), updatedAt: new Date() },
            { jumlah: 30, totalHarga: 300, tanggalPenjualan: "2021-05-11", BarangId: 4, createdAt: new Date(), updatedAt: new Date() },
            { jumlah: 25, totalHarga: 250, tanggalPenjualan: "2021-05-12", BarangId: 5, createdAt: new Date(), updatedAt: new Date() },
            { jumlah: 5, totalHarga: 50, tanggalPenjualan: "2021-05-12", BarangId: 5, createdAt: new Date(), updatedAt: new Date() },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Penjualans', null, {});
    }
};
