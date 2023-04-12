import fastify from 'fastify'
import { userRoutes } from './routes/userRoutes'
import { env } from './env'

const app = fastify()

app.register(userRoutes, {
  prefix: 'user',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server Running')
  })
