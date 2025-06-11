const UsuarioService = require('../services/UsuarioService');

const UsuarioController = {
    async cadastrar(req, res) {
        try {
            const resultado = await UsuarioService.cadastrar(req.body);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ mensagem: error.message });
        }
    },
    
    async listar(req, res) {
        try{
            const usuarios = await UsuarioService.listar();
            res.status(200).json(usuarios);
        } catch {
            res.status(500).json({ mensagem: error.message })
        }
    },

    async login(req, res) {
        try {
            const token = await UsuarioService.login(req.body);
            
            // Define o cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 24 horas
            });
    
            // Retorna o token também no body
            return res.status(200).json({
                token,
                mensagem: 'Login realizado com sucesso'
            });
        } catch (error) {
            return res.status(400).json({ mensagem: error.message });
        }
    }
}

module.exports = UsuarioController;