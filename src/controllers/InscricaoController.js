const InscricaoService = require('../services/InscricaoService');

const InscricaoController = {
    async inscrever(req, res) {
        try {
            const { idCurso } = req.params;
            const { id: idUsuario } = req.user;

            await InscricaoService.inscrever(idUsuario, idCurso);
            return res.status(200).json({ mensagem: 'Inscrição realizada com sucesso' });
        } catch (error) {
            return res.status(error.status || 400).json({ mensagem: error.mensagem });
        }
    },

    async cancelar(req, res) {
        try {
            const { idCurso } = req.params;
            const { id: idUsuario } = req.user;

            await InscricaoService.cancelar(idUsuario, idCurso);
            return res.status(200).json({ mensagem: 'Inscrição cancelada com sucesso' });
        } catch (error) {
            return res.status(error.status || 400).json({ mensagem: error.mensagem });
        }
    }

}

module.exports = InscricaoController;