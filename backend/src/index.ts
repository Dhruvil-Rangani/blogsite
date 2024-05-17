import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import router from './routes/router'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

app.use('/*', cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1', router)

export default app
