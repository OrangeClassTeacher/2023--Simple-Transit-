import React, { useState, useEffect } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { ChatInput } from "./chat";
import { configureAbly } from "@ably-labs/react-hooks";
import { nanoid } from "nanoid";
import { Message } from "./messages";
import axios from "axios"
export const ChatContainer = ({ selectChannel }: any) => {
    const [history, setHistory] = useState([]);
    const id1 = localStorage.getItem("id")
    console.log("a", selectChannel.split("_")[0]);

    const id2 = id1 == selectChannel.split("_")[0] ? selectChannel.split("_")[1] : selectChannel.split("_")[0]
    configureAbly({
        key: process.env.NEXT_PUBLIC_ABLY_KEY,
        clientId: nanoid(),
    });

    useEffect(() => {
        setHistory([]); // Reset history on channel change
    }, [selectChannel]);

    const [channel] = useChannel(selectChannel, (message) => {
        setHistory((prev): any => [...prev.slice(-199), message]);
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
        <div className="p-2 ">
            Connected to {selectChannel}
            <ChatInput sendMessage={sendMessage} />
            <Message messages={history} />
        </div>
    );
};