const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Barang extends Model {
    static associate(models) {
      Barang.hasMany(models.Penjualan, {
        foreignKey: 'BarangId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Barang.init({
    nama: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    jumlahTerjual: DataTypes.INTEGER,
    tanggalTransaksi: DataTypes.DATE,
    jenisBarang: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Barang',
    tableName: 'Barangs',
  });

  return Barang;
};
