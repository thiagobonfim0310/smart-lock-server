import crypto from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function userRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const users = await knex('user').select()

    return users
  })

  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      email: z.string(),
      password: z.string(),
      name: z.string(),
      type: z.string(),
    })

    const { name, type, email, password } = createUserBodySchema.parse(
      request.body,
    )
    console.log(name, type, email, password)
    await knex('user').insert({
      id: crypto.randomUUID(),
      name,
      type,
      email,
      password,
    })

    return reply.status(201).send()
  })

  app.post('/authenticate', async (request, reply) => {
    const createUserBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = createUserBodySchema.parse(request.body)

    const user = await knex('user')
      .where({
        email,
        password,
      })
      .first()

    return { user }
  })
}
