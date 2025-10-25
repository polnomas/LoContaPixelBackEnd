import Koa from "koa"
import bodyParser from "koa-bodyparser"
import cors from "@koa/cors"
import router from "./routes/index.js"
import "dotenv/config"

const app = new Koa()

app.use(async (ctx, next) => {
    try {
        await next()
        if (ctx.status === 404 && !ctx.body) {
            ctx.body = {
                error: "Not Found"
            }
        }
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = { error: err.message || "Internal Server Error" }
        ctx.app.emit("error", err, ctx)
    }
})

if (process.env.ENVIRONMENT === 'production') {
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }))
}
else {
    app.use(cors())
}
app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())

export default app