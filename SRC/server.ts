import fastify from "fastify"
import {z} from 'zod'
import { PrismaClient } from "@prisma/client"

const app = fastify()

const prisma = new PrismaClient({
    log: ['query'],
})

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ... (o que vamos fazer)
// Corpo da requisição (Request Body)
// Parâmetros de busca (Search Params / Query Params) 'http://localhost:3333/users?name=Diego'
// Parâmetros de rota (Rout Params) -> Identificação de recursos 'DELETE http://localhost:3333/users/5' (parâmetros obrigatórios e não nomeados.)
// Cabeçalhos (Headers) -> Contexto "autenticação, idioma, fuso-horário..."

// Semânticas = Significado 

// BD Driver nativo 
// Query builders (knex.js) 
// ORMs -> (Object Relational Mapping) ex.: PRISMA, SEQUELIZE, Hibernate, Doctrine, ActiveRecord

//

app.post("/events", async (request, reply) => {

    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
    })
    const data = createEventSchema.parse(request.body)

    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendees,
            slug: new Date().toISOString()
        },
    })

    return {eventId: event.id}
})

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})