import { Request, Response } from 'express';
import Message, { IMessage } from '../model/messages.model';

export const createMessage = async (req: Request, res: Response) => {
    try {
        const { content, sender, receiver } = req.body;
        const message: IMessage = new Message({ content, sender, receiver });
        await message.save();
        res.status(201).json({ message: 'Message created successfully', data: message });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create message', error: error });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages: IMessage[] = await Message.find();
        res.status(200).json({ data: messages });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get messages', error: error });
    }
};
