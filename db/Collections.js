import getDB from "./DBProvider.js"
import Pins from "./Pins.js"

const db = await getDB()
const pins = new Pins(db)

export { pins }