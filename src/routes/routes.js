const notasController = require('../controllers/notasController')
const notasEnviadasController = require('../controllers/notasEnviadasController')
const express = require('express')
const router = express.Router()

router.get('/notas', notasController.show)
router.get('/notas/:id', notasController.getOne)
router.post('/notas',notasController.create)
router.post('/atualizar', notasController.update)
router.get('/atualizar', (req, res) =>{
    res.render('atualizar.html')
})
router.get('/enviadas', notasEnviadasController.show)

module.exports = router
