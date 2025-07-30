const { z } = require('zod');

const casoSchema = z.object({
    titulo: z.string({ required_error: 'Titulo é obrigatório.'}).min(1, 'Nome não pode ser vazio.'),
    descricao: z.string({ required_error: 'Descrição é obrigatória.'}).min(1, 'Descrição não pode ser vazia.'),
    status: z.enum(['aberto', 'solucionado'], {
        required_error: 'Status é obrigatório.',
        invalid_type_error: 'Status dever ser "aberto" ou "solucionado".'
    }),
    agente_id: z.uuid({ required_error: 'Id do agente é obrigatório.'})
});

const partialCasoSchema = casoSchema.partial();

const idSchema = z.object({
    id: z.uuid({
        required_error: 'Uuid é obrigatório'
    })
});

module.exports = {
    idSchema,
    casoSchema,
    partialCasoSchema   
};