const express = require('express');
const productosController = require('../controllers/productos'); 

const router = express.Router();

router.get('/', async (req, res) => {
    const response = await productosController.getAll();
    res.send(response);
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await productosController.getById(id);
    res.send(response);
});

router.post('/', async (req, res) => {
    const producto = req.body;
    const response = await productosController.save(producto);
    res.send(response);
});

router.put('/:id', async (req, res) => {
    const producto = req.body;
    const id = parseInt(req.params.id);
    const response = await productosController.updateById(id, producto);
    res.send(response);
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await productosController.deleteById(id);
    res.send(response);
});

module.exports = router;