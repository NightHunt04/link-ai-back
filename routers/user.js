import { Router } from 'express'
import { handleAppendNewUser, handleCheckIsUserSigned, handleCheckUserSetProfile } from '../controllers/user.js'

export const userRouter = Router()

userRouter
    .post('/sign-user', handleAppendNewUser)
    .post('/check-user', handleCheckIsUserSigned)
    .post('/check-setup-profile', handleCheckUserSetProfile)