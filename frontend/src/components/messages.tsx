import axios from "axios";
import React, { useEffect, useState } from "react";

export const Message = ({ messages, time, id1, id2, sender }: any) => {
    console.log("message and time", messages, time);
    const name = localStorage.getItem("name")
    const timeArr = time.map((e: any) => new Date(e))
    const hourArr = timeArr.map((e: any) => e.getHours())
    const minutes = timeArr.map((e: any) => e.getMinutes())
    const [name2, setName2] = useState<any>("")
    const [user, setUser] = useState<any>()
    useEffect(() => {
        console.log("id2", id2);
        console.log("name", name);

        axios.post("http://localhost:9000/api/user/getone", { userId: id2 })
            .then((res) => {
                setName2(res.data.result.name)
                setUser(res.data.result)
                console.log(user);

                console.log("name2", res.data.result[0].name)
            }

            )
            .catch((err) => console.log(err)
            )
    }, [id2])
    return (
        <div className="flex flex-col">
            <ul>
                {messages.map((msg: any, index: any) => (
                    <div>
                        <li key={index}>
                            {sender[index] == id1 && name}
                            {sender[index] == id2 && name2}
                            {msg}{msg?.data?.text}  {hourArr[index]}:{minutes[index]}</li>

                    </div>
                ))}
            </ul>
        </div>
    );
};