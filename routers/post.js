import { Router } from 'express'
import { handlePost } from '../controllers/post.js'

export const postRouter = Router()

postRouter.post('/post', handlePost)
