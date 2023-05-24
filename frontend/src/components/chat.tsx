import React, { useState } from "react";

export const ChatInput = ({ sendMessage }: any) => {
    const [text, setText] = useState("");
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (text.trim() === "") {
            return;
        }
        sendMessage(text);
        setText("");
    };

    return (
        <div className="flex items-center">
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <label>Chat text</label>
                <input
                    autoFocus
                    className="px-4 py-3 rounded-md border-green-29"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    id="comment"
                    onKeyDown={(e) => {
                        if (e.code == "Enter") {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                />
                <button className="rounded-md p-2 bg-red-500 text-white">send</button>
            </form>
        </div>
    );
};