module.exports = (app, Barang) => {
    app.post('/barang', async (req, res) => {
        try {
            const newBarang = req.body;
            const createdBarang = await Barang.create(newBarang);
            res.json(createdBarang);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/barang', async (req, res) => {
        try {
            const barang = await Barang.findAll();
            res.json(barang);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/barang/:id', async (req, res) => {
        try {
            const barang = await Barang.findByPk(req.params.id);
            if (barang) {
                res.json(barang);
            } else {
                res.status(404).json({ error: 'Not Found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.put('/barang/:id', async (req, res) => {
        try {
            const updatedBarang = await Barang.update(req.body, {
                where: { id: req.params.id },
            });
            if (updatedBarang[0]) {
                res.json({ message: 'Updated successfully' });
            } else {
                res.status(404).json({ error: 'Not Found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.delete('/barang/:id', async (req, res) => {
        try {
            const deletedBarang = await Barang.destroy({
                where: { id: req.params.id },
            });
            if (deletedBarang) {
                res.json({ message: 'Deleted successfully' });
            } else {
                res.status(404).json({ error: 'Not Found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return app;
};
