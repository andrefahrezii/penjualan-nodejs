const { Op } = require('sequelize');
module.exports = (app, Penjualan, Barang) => {
    app.get('/penjualan', async (req, res) => {
        try {
            const { barangId, search, filter, limit, order } = req.query;

            let whereCondition = {};
            if (barangId) {
                whereCondition = { barangId };
            }
            if (search) {
                whereCondition.totalHarga = { [Op.like]: `%${search}%` };
            }
            if (filter === 'terbanyak') {
            } else if (filter === 'terdikit') {
            }

            const sales = await Penjualan.findAll({
                where: whereCondition,
                ...(limit ? { limit: parseInt(limit, 10) } : {}),
                order: [['jumlah', order || 'DESC']],
            });

            res.json(sales);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    app.post('/penjualan', async (req, res) => {
        try {
            const penjualanData = req.body;
            const createdPenjualans = [];

            for (const data of penjualanData) {
                const { barangId, jumlah } = data;

                const barang = await Barang.findByPk(barangId);

                if (!barang) {
                    return res.status(404).json({ error: `Barang with ID ${barangId} not found` });
                }

                const updatedStok = barang.stok - jumlah;
                if (updatedStok < 0) {
                    return res.status(400).json({ error: `Not enough stock available for Barang with ID ${barangId}` });
                }

                const newPenjualan = {
                    barangId,
                    jumlah,
                    totalHarga: jumlah,
                    tanggalPenjualan: new Date(),
                };

                const createdPenjualan = await Penjualan.create(newPenjualan);
                createdPenjualans.push(createdPenjualan);

                await Barang.update({
                    stok: updatedStok,
                    jumlahTerjual: barang.jumlahTerjual + jumlah,
                    tanggalTransaksi: newPenjualan.tanggalPenjualan,
                }, { where: { id: barangId } });
            }

            res.json(createdPenjualans);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    return app;
};
