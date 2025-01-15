import mongoose from "mongoose"

let isConnected = false

export const connectMongo = async () => {
    if (isConnected) {
        console.log('Using existing database connection')
        return
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, { socketTimeoutMS: 45000 })
        isConnected = true
        console.log(`MongoDB connected: ${conn.connection.host}`)

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`)
            isConnected = false
        })

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected')
            isConnected = false
        })

        process.on('SIGINT', async () => {
            await mongoose.connection.close()
            console.log('MongoDB connection closed through app termination')
            process.exit(0)
        })
    } catch(err) {
        console.log(err)
        isConnected = false
        setTimeout(connectMongo, 5000)
    }
}