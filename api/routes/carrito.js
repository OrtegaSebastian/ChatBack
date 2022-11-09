const express = require('express');
const carritosController = require('../controllers/carritos'); 

const router = express.Router();

router.get('/', async (req, res) => {
    const response = await carritosController.getAll();
    res.send(response);
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await carritosController.getById(id);
    res.send(response);
});

router.post('/', async (req, res) => {
    const producto = req.body;
    const response = await carritosController.save(producto);
    res.send(response);
});

router.put('/:id', async (req, res) => {
    const producto = req.body;
    const id = parseInt(req.params.id);
    const response = await carritosController.updateById(id, producto);
    res.send(response);
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await carritosController.deleteById(id);
    res.send(response);
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const idproducto = parseInt(req.params.idproducto);
    const response = await carritosController.deleteProductoById(id, idproducto);
    res.send(response);
});

module.exports = router;