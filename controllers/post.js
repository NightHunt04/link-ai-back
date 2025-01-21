import { set, ref } from 'firebase/database'
import { db } from '../config.js'
import { delayModel } from '../models/delays.js'
import { v4 as uuidv4 } from 'uuid'

export const handlePost = async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: 'Invalid request, nothing inside body', code: 0 })
    
    try {
        const postId = uuidv4()
        const { postTextContent, mediaAttachmentBase64, email } = req.body
        const dbRef = ref(db, `post-data/${email.split('@')[0]}/${postId}`)
        const postedAt = new Date().getTime() / 1000
        let postData

        if (mediaAttachmentBase64) {
            postData = {
                postTextContent,
                mediaAttachmentBase64,
                postedAt,
                postId,
                comments: [],
                likes: 0
            }
        } else {
            postData = {
                postTextContent,
                mediaAttachmentBase64,
                postedAt,
                postId,
                comments: [],
                likes: 0
            }
        }

        await set(dbRef, postData)
        const delayRes = await delayModel.findOne({ email })

        if (!delayRes) {
            const userDelayData = {
                email,
                delays: [{ postId, delay: postedAt + 5 * 60 }]
            }
            await delayModel.create(userDelayData)
        } else {
            const userDelayData = await delayModel.findOne({ email })
            const newDelays = [...userDelayData.delays, { postId, delay: postedAt + 5 * 60 }]

            await userDelayData.updateOne({ $set: { delays: newDelays } })
        }

        return res.status(201).json({ msg: 'success', code: 1 })
        
    } catch (err) {
        console.error(err)
        return res.status(501).json({ msg: 'Internal server error', err, code: 0 })
    }
}