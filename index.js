import app from "./app.js"
import "dotenv/config"

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    const env = process.env.ENVIRONMENT
    if (env === 'development') console.log(`LoContaPixelBackend escuchando en http://localhost:${PORT}`)
    else console.log(`LoContaPixelBackend escuchando en el puerto ${PORT}`)
})