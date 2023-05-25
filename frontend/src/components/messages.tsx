import axios from "axios";
import React, { useEffect, useState } from "react";
import Utils from "@/utils/utils";

export const Message = ({ messages, time, id1, id2, sender }: any) => {
    console.log("message and time", messages, time);
    const name = localStorage.getItem("name")
    const timeArr = time.map((e: any) => new Date(e))
    const hourArr = timeArr.map((e: any) => e.getHours())
    const minutes = timeArr.map((e: any) => e.getMinutes())
    const [name2, setName2] = useState<any>("")
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        console.log("id2", id2);
        console.log("name", name);

        axios.post(`${Utils.API_URL}/user/getone`, { userId: id2 })
            .then((res) => {
                setName2(res.data.result[0].name)
                setUser(res.data.result[0])
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
                        <li key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                {sender[index] !== id1 ? name : name2}

                            </div>
                            <div>
                                {msg}{msg?.data?.text}
                            </div>

                            <div>
                                {hourArr[index]}:{minutes[index]}
                            </div>
                        </li>

                    </div>
                ))}
            </ul>
        </div>
    );
};