const InscricaoService = require('../services/InscricaoService');

const InscricaoController = {
    async inscrever(req, res) {
        try {
            const usuarioId = req.user.id;
            const cursoId = req.params.idCurso;
            
            // Verifica se o curso existe
            const cursoExiste = await CursoService.buscarPorId(cursoId);
            if (!cursoExiste) {
                return res.status(404).json({ 
                    mensagem: "Curso não encontrado" 
                });
            }

            await CursoService.inscrever(usuarioId, cursoId);
            return res.status(200).json({ 
                mensagem: "Inscrição realizada com sucesso" 
            });
        } catch (error) {
            return res.status(400).json({ 
                mensagem: "Erro ao realizar inscrição: " + error.message 
            });
        }
    },

    async cancelar(req, res) {
        try {
            const usuarioId = req.user.id;
            const cursoId = req.params.idCurso;

            // Verifica se o curso existe
            const cursoExiste = await CursoService.buscarPorId(cursoId);
            if (!cursoExiste) {
                return res.status(404).json({ 
                    mensagem: "Curso não encontrado" 
                });
            }

            await CursoService.cancelarInscricao(usuarioId, cursoId);
            return res.status(200).json({ 
                mensagem: "Inscrição cancelada com sucesso" 
            });
        } catch (error) {
            return res.status(400).json({ 
                mensagem: "Erro ao cancelar inscrição: " + error.message 
            });
        }
    }

}

module.exports = InscricaoController;