import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput } from '@ksingh08/common-intern';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(
  cors({
    origin: '*',
  })
);

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  const body=await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(409);
    return c.json({
      message:"Inputs not correct"
    })
  }
try{
  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password,
    }
  })

  const jwt = await sign({id:user.id},c.env.JWT_SECRET)

  return c.text(
    jwt,
    
  )
}catch(e){
  console.log(e);
  c.status(411);
  return c.text("Invalid");
}
});

export default app;
