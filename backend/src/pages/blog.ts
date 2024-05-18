import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@dhruvilrangani/medium-common";

const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    }
}>();

blog.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    console.log("JWT: ", jwt)
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    const token: string = jwt;
    try {
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        c.set('userId', payload.id);
        await next()
    } catch (error) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }

})

blog.post('/', async (c) => {
    const body = await c.req.json();
    const { success} = createBlogInput.safeParse(body);
    if (!success){
        c.status(411);
        return c.json({
            error: "Invalid input" 
        })
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: String(userId)
        }
    });

    return c.json({
        id: blog.id
    });
})

blog.put('/', async (c) => {
    const body = await c.req.json();
    const { success} = updateBlogInput.safeParse(body);
    if (!success){
        c.status(411);
        return c.json({
            error: "Invalid input" 
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    });
});

// There should be pagination for client
blog.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            author:{
                 select:{
                    name: true
                 }
            }
        }
    });
    return c.json({
        blogs
    })
});

blog.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: String(id)
            },
            select:{
                id: true,
                title: true,
                content: true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });

        return c.json({
            blog
        });
    } catch (error) {
        c.status(401);
        return c.json({
            error: "Error while fetching blog post"
        })
    }
})



export default blog;