const { z } = require('zod');

const agenteSchema = z.object({
    id: z.string().uuid({required_error: 'Erro na criação do id.'}),
    nome: z.string({ required_error: 'Nome é obrigatório.'}).min(1, 'Nome não pode ser vazio.'),
    dataDeIncorporacao: z.string({ required_error: 'Data de incorporação é obrigatória.'}).min(1, 'Data de incorporação não pode ser vazia.'),
    cargo: z.enum(['inspetor', 'delegado'], {
        required_error: 'Cargo é obrigatório.',
        invalid_type_error: 'Cargo dever ser "inspetor" ou "delegado".'
    }),
})