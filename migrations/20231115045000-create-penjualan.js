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
            BarangId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Barangs',
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
