const express = require('express');
const router = express.Router();
const CursoController = require('../controllers/CursoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:idUsuario', authMiddleware, CursoController.listarCursosInscritos);

module.exports = router;