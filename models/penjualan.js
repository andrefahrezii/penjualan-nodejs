const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Penjualan extends Model {
        static associate(models) {
            Penjualan.belongsTo(models.Barang, {
                foreignKey: 'BarangId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }

    Penjualan.init({
        jumlah: DataTypes.INTEGER,
        totalHarga: DataTypes.INTEGER,
        barangId: DataTypes.INTEGER,
        tanggalPenjualan: DataTypes.DATE,
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Penjualan',
        tableName: 'Penjualans',
    });

    return Penjualan;
};
