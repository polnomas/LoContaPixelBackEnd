import Router from "@koa/router"
import bodyParser from "koa-bodyparser"
import { pins } from "../db/Collections.js"

const pinsRouter = new Router({ prefix: "/pins" })

pinsRouter.get("/", async (ctx) => {
    try {
        const list = await pins.readAll()
        ctx.body = { list }
    } catch(err) {
        ctx.body = { error: err.message }
    }
})
pinsRouter.post("/", bodyParser(), async (ctx) => {
    try {
        const result = await pins.createNew(ctx.request.body || {})
        ctx.status = 201
        ctx.body = {_id: result.insertedId}
    } catch (err) {
        ctx.status = 400
        ctx.body = { error: err.message }
    }
})

export default pinsRouter