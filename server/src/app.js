import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5001

async function start() {
    try {
        await app.listen(PORT, () =>
            console.log(`[app] Server is running on port ${PORT}`)
        )
    } catch (error) {
        console.log(`[app] error: ${error.message}`)
    }
}

start()
