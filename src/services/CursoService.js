const Curso = require('../models/Curso');
const Inscricao = require('../models/Inscricao');
const { Op } = require('sequelize');
const sequelize = require('../../config/database');

const CursoService = {

    async buscarPorId(cursoId) {
        const curso = await Curso.findByPk(cursoId);
        return curso;
    },

    async listarCursos(userId, filtro) {
        const whereClause = filtro ? {
            [Op.or]: [
                { nome: { [Op.like]: `%${filtro}%` } },
                { descricao: { [Op.like]: `%${filtro}%` } }
            ]
        } : {};
        
        const cursos = await Curso.findAll({
            where: whereClause,
            include: [
                {
                    model: Inscricao,
                    attributes: []
                }
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM inscricoes WHERE inscricoes.curso_id = Curso.id)'),
                        'total_inscricoes'
                    ],
                    [
                        sequelize.literal(`(SELECT COUNT(*) FROM inscricoes WHERE inscricoes.curso_id = Curso.id AND inscricoes.usuario_id = ${userId})`),
                        'usuario_inscrito'
                    ]
                ]
            }
        });

        return cursos.map(curso => ({
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            inscricoes: curso.getDataValue('total_inscricoes'),
            inicio: new Date(curso.inicio).toLocaleDateString('pt-BR'),
            inscrito: curso.getDataValue('usuario_inscrito') > 0
        }));
    },

    async listarCursosInscritos(userId) {
        const cursos = await Curso.findAll({
            include: [{
                model: Inscricao,
                where: { 
                    usuario_id: userId
                },
                required: true
            }],
            attributes: {
                include: [
                    [sequelize.literal('(SELECT COUNT(*) FROM inscricoes WHERE inscricoes.curso_id = Curso.id)'),
                    'total_inscricoes'],
                    [sequelize.literal('(Inscricao.data_cancelamento IS NOT NULL)'),
                    'inscricao_cancelada']
                ]
            }
        });

        return cursos.map(curso => ({
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            inscricoes: curso.getDataValue('total_inscricoes'),
            inicio: new Date(curso.inicio).toLocaleDateString('pt-BR'),
            inscricao_cancelada: curso.getDataValue('inscricao_cancelada'),
            inscrito: true
        }));
    }
}



module.exports = CursoService;