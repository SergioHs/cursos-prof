const CursoService = require('../services/CursoService');

const CursoController = {
    async listarCursos(req, res) {
        try {
            const usuarioId = req.user.id;
            const filtro = req.query.filtro || null;
            const cursos = await CursoService.listarCursos(usuarioId, filtro);
            res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar cursos: " + error});
        }
    },

    async listarCursosInscritos(req, res) {
        try {
            const usuarioLogadoId = req.user.id;
            const usuarioSolicitadoId = parseInt(req.params.idUsuario);

            // Verifica se o usuário está tentando acessar seus próprios cursos
            if (usuarioLogadoId !== usuarioSolicitadoId) {
                return res.status(403).json({ 
                    mensagem: "Não autorizado a ver inscrições de outro usuário" 
                });
            }

            const cursos = await CursoService.listarCursosInscritos(usuarioLogadoId);
            return res.status(200).json(cursos);

        } catch (error) {
            return res.status(500).json({ 
                mensagem: "Erro ao buscar cursos inscritos: " + error 
            });
        }
    }
}

module.exports = CursoController;