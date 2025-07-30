const { z } = require('zod');

const agenteSchema = z.object({
    nome: z.string({ required_error: 'Nome é obrigatório.' }).min(1, 'Nome não pode ser vazio.'),

    dataDeIncorporacao: z.string({ required_error: 'Data de incorporação é obrigatória.' }).regex(/^\d{4}\/\d{2}\/\d{2}$/, 'Data deve estar no formato YYYY/MM/DD'),

    cargo: z.enum(['inspetor', 'delegado'], {
        required_error: 'Cargo é obrigatório.',
        invalid_type_error: 'Cargo deve ser "inspetor" ou "delegado".'
    }),
});

const partialAgenteSchema = agenteSchema.partial();

const idSchema = z.object({
    id: z.uuidv4({
        required_error: 'Uuid é obrigatório',
        invalid_type_error: 'O id vere seguir a formatação uuid' 
    })
});

module.exports = {
    agenteSchema,
    idSchema,
    partialAgenteSchema
}