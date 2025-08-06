const { z } = require('zod');

const idSchema = z.object({
  id: z.string().uuid()
});

const casoSchema = z.object({
    titulo: z.string({ required_error: 'Titulo é obrigatório.'}).min(1, 'Nome não pode ser vazio.'),
    descricao: z.string({ required_error: 'Descrição é obrigatória.'}).min(1, 'Descrição não pode ser vazia.'),
    status: z.enum(['aberto', 'solucionado'], {
        required_error: 'Status é obrigatório.',
        invalid_type_error: 'Status deve ser "aberto" ou "solucionado".'
    }),
    agente_id: idSchema
});
const agenteSchema = z.object({
    nome: z.string({ required_error: 'Nome é obrigatório.' }).min(1, 'Nome não pode ser vazio.'),

    dataDeIncorporacao: z.string({ required_error: 'Data de incorporação é obrigatória.' }).regex(/^\d{4}\/\d{2}\/\d{2}$/, 'Data deve estar no formato YYYY/MM/DD'),

    cargo: z.enum(['inspetor', 'delegado'], {
        required_error: 'Cargo é obrigatório.',
        invalid_type_error: 'Cargo deve ser "inspetor" ou "delegado".'
    }),
});     

const partialAgenteSchema = agenteSchema.partial();

const partialCasoSchema = casoSchema.partial();

const errorHandler = ( err, req, res, next ) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor.';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = 
errorHandler,
casoSchema,
agenteSchema,
idSchema,
partialAgenteSchema,
partialCasoSchema;