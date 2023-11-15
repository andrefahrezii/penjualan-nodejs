// routes/penjualanRoutes.js
const { Op } = require('sequelize');
module.exports = (app, Penjualan, Barang) => {
    // Implementasikan rute CRUD untuk Penjualan di sini
    app.get('/penjualan', async (req, res) => {
        try {
            const { barangId, search, filter, limit, order } = req.query;

            let whereCondition = {};
            if (barangId) {
                whereCondition = { barangId };
            }

            // Gunakan parameter search untuk mencari berdasarkan kolom yang benar
            if (search) {
                whereCondition.totalHarga = { [Op.like]: `%${search}%` };
            }

            // Logika filter terbanyak dan terdikit
            if (filter === 'terbanyak') {
                // Logika terbanyak
            } else if (filter === 'terdikit') {
                // Logika terdikit
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


    // app.post('/penjualan', async (req, res) => {
    //     try {
    //         const newPenjualan = req.body;
    //         const createdPenjualan = await Penjualan.create(newPenjualan);
    //         res.json(createdPenjualan);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // });
    app.post('/penjualan', async (req, res) => {

        try {
            const { barangId, jumlah } = req.body;
            console.log(barangId)
            // Check if the Barang with given ID exists
            const barang = await Barang.findByPk(barangId);
            console.log(await Barang.findByPk(barangId))
            if (!barang) {
                return res.status(404).json({ error: 'Barang not found' });
            }

            // Update stock of Barang
            const updatedStok = barang.stok - jumlah;
            if (updatedStok < 0) {
                return res.status(400).json({ error: 'Not enough stock available' });
            }

            // Create new Penjualan
            const newPenjualan = {
                barangId,
                jumlah,
                totalHarga: jumlah,
                tanggalPenjualan: new Date(),
            };

            console.log(newPenjualan)
            const createdPenjualan = await Penjualan.create(newPenjualan);

            // Update stock of Barang in the database
            await Barang.update({
                stok: updatedStok,
                jumlahTerjual: barang.jumlahTerjual + jumlah,
                tanggalTransaksi: newPenjualan.tanggalPenjualan,
            }, { where: { id: barangId } });

            res.json(createdPenjualan);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // tambahkan rute CRUD lainnya sesuai kebutuhan

    return app;
};
