import React, { useState, useEffect } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { ChatInput } from "./chat";
import { configureAbly } from "@ably-labs/react-hooks";
import { nanoid } from "nanoid";
import { Message } from "./messages";
import axios from "axios"
export const ChatContainer = ({ selectChannel }: any) => {
    const [history, setHistory] = useState<any>([]);
    const [time, setTime] = useState([])
    const id1 = localStorage.getItem("id");
    const [sender, setSender] = useState<any>([])
    console.log("a", selectChannel.split("_")[0]);

    const id2 = id1 == selectChannel.split("_")[0] ? selectChannel.split("_")[1] : selectChannel.split("_")[0]
    configureAbly({
        key: process.env.NEXT_PUBLIC_ABLY_KEY,
        clientId: nanoid(),
    });

    useEffect(() => {
        axios.post("http://localhost:9000/api/messages/getall", { userId: id1, receiverId: id2 })
            .then((res) => {
                const newArr = res.data.result.map((e: any) => e.content)
                console.log("history", newArr);
                const newArr2 = res.data.result.map((e: any) => e.createdAt)
                setHistory(newArr);
                const newArr3 = res.data.result.map((e: any) => e.sender)
                console.log("senders", newArr3);

                setTime(newArr2)
                setSender(newArr3)
            })

    }, [selectChannel]);

    const [channel] = useChannel(selectChannel, (message) => {
        setHistory((prev: any): any => [...prev.slice(-199), message.data.text]);
    });

    const sendMessage = async (messageText: any) => {
        await channel.publish("message", { text: messageText });
        console.log("Datas", id1, id2, messageText);

        await axios.post("http://localhost:9000/api/messages/create", {
            content: messageText,
            sender: id1,
            receiver: id2
        })
            .then((res) => console.log("message db", res.data.result))
            .catch((err) => console.log(err)
            )
    };

    return (
        <div className="p-2 h-40">
            Connected to {selectChannel}
            <Message messages={history} time={time} id1={id1} id2={id2} sender={sender} />
            <ChatInput sendMessage={sendMessage} />

        </div>
    );
};