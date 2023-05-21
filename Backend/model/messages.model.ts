import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
    content: string;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        content: { type: String, required: true },
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
    }
);

const Message = model<IMessage>('Message', messageSchema);

export default Message;
