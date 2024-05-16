import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign, jwt } from "hono/jwt";
import { bunFileSystemModule } from "hono/bun";
import { signupInput, signinInput } from "@dhruvilrangani/medium-common";

const user = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

user.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    try {
        const userExist = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if (userExist) {
            c.status(400);
            return c.text("User Already Exist");
        }

        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password
            }
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.text(token);
    } catch (error) {
        c.status(411);
        console.log(error)
        return c.text("Invalid!");
    }


})

user.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });

        if (!user) {
            c.status(403);
            return c.json({ error: "Incorrect Creds" });
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.text(jwt);
    } catch (error) {
        c.status(411);
        return c.text("Invalid!");
    }

})

export default user;