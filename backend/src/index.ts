import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import router from './routes/router'

const app = new Hono()



app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1', router)

export default app
