'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Penjualans', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            jumlah: {
                type: Sequelize.INTEGER
            },
            totalHarga: {
                type: Sequelize.INTEGER
            },
            tanggalPenjualan: {
                type: Sequelize.DATE
            },
            // Sesuaikan dengan nama kolom yang sesuai dengan asosiasi model Barang
            BarangId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Barangs', // Sesuaikan dengan nama tabel Barang
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Penjualans');
    }
};
