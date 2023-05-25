import { Request, Response } from 'express';
import Message, { IMessage } from '../model/messages.model';

export const createMessage = async (req: Request, res: Response) => {
    try {
        const { content, sender, receiver } = req.body;
        const message: IMessage = new Message({ content, sender, receiver });
        await message.save();
        res.status(201).json({ status: true, message: 'Message created successfully', result: message });
        return
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to create message', error: error });
        return
    }
};

export const getMessages = async (req: Request, res: Response) => {
    const { userId, receiverId } = req.body
    try {
        const messages: IMessage[] = await Message.find({ $or: [{ $and: [{ sender: userId }, { receiver: receiverId }] }, { $and: [{ sender: receiverId }, { receiver: userId }] }] },
            { __v: 0 },
            { sort: { createdAt: 1 } });
        res.status(200).json({ status: true, result: messages });
        return
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to get messages', error: error });
        return
    }
};
