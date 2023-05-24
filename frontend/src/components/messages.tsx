import React from "react";

export const Message = ({ messages }: any) => {
    console.log(messages);

    return (
        <div>
            <ul>
                {messages.map((msg: any, index: any) => (
                    <li key={index}>{msg?.data?.text}</li>
                ))}
            </ul>
        </div>
    );
};