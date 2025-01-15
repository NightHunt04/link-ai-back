import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    isProfileSet: {
        type: Boolean,
        required: true
    }
})

export const userModel = model("logged_in_user", userSchema)

// userModel.ensureIndexes((err) => {
//     if (err) console.error(`Something went wrong while ensuring indexes: ${err}`)
//     else console.log('Indexes for field "email" successfully created')
// })