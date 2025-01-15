import { userModel } from '../models/user.js'

// handler to be called when a new user has to be appended
export const handleAppendNewUser = async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: 'Bad request' })
    const { email, displayName, uid } = req.body
    
    if (!email || !displayName || !uid) return res.status(400).json({ msg: 'Missing some field' })

    try {
        await userModel.create({ displayName, email, uid, isProfileSet: false })    
        return res.status(201).json({ msg: 'Success' })
    } catch(err) {
        console.error(`Something went wrong while appending user: ${err}`)
        return res.status(501).json({ msg: 'Internal server error' })
    }
}

// handler to be called when to check wether the user is signed
export const handleCheckIsUserSigned = async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: 'Bad request' })
    const { email } = req.body

    if (!email) return res.status(400).json({ msg: 'Missing email' })
    
    try {
        const user = await userModel.findOne({ email })

        if (!user) return res.status(200).json({ msg: 'User not signed', code: 0 })
        return res.status(200).json({ msg: 'User is signed', code: 1 })  
    } catch(err) {
        console.error(`Something went wrong while check if the user is signed: ${err}`)
        return res.status(501).json({ msg: 'Internal server error' })
    }
}

// handler to check wether the user has set profile or not
export const handleCheckUserSetProfile = async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: 'Bad request' })
    const { email } = req.body

    if (!email) return res.status(400).json({ msg: 'Missing email' })
    
    try {
        const user = await userModel.findOne({ email })

        if (user.isProfileSet)
            return res.status(200).json({ msg: 'yes, user has set profile', code: 1 })

        return res.status(200).json({ msg: 'no, user has not set profile', code: 0 })  
    } catch(err) {
        console.error(`Something went wrong while check if the user is signed: ${err}`)
        return res.status(501).json({ msg: 'Internal server error' })
    }
}