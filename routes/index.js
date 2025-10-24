import Router from "@koa/router"
import pinsRouter from "./pins.js"

const router = new Router()

router.get("/health", (ctx) => {
    ctx.body = {ok: true, ts: Date.now()}
})

router.use(pinsRouter.routes(), pinsRouter.allowedMethods())

export default router