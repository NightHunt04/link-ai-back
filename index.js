import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectMongo } from './connectMongoose.js'
import { userRouter } from './routers/user.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

connectMongo()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('ok'))  

app.use('/api/user', userRouter)

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`))

export default app