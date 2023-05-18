import axios from 'axios';
import React, { useState } from 'react';


type User = {
    id: number;
    name: string;
    isFriend: boolean;
    isPendingFriendRequest: boolean;
}

type Props = {
    user: User;
    onAddFriend: (userId: number) => void;
    onUnfriend: (userId: number) => void;
    onSendFriendRequest: (userId: number) => void;
}

const UserCard: React.FC<Props> = ({ user, onAddFriend, onUnfriend, onSendFriendRequest }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [userID, setUserId] = useState()

    const handleAddFriendClick = () => {
        axios.post("http://localhost:9000/api/user/login", { user })
            .then((res) => console.log(res.data)
            )


    };

    const handleUnfriendClick = () => {
        onUnfriend(user.id);
    };

    const handleSendFriendRequestClick = () => {
        onSendFriendRequest(user.id);
    };

    return (
        <div
            className="user-card"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <h3>{user.name}</h3>
            {user.isFriend ? (
                <button onClick={handleUnfriendClick}>Unfriend</button>
            ) : user.isPendingFriendRequest ? (
                <button disabled={true}>Friend Request Sent</button>
            ) : (
                <button onClick={handleAddFriendClick}>Add Friend</button>
            )}
            {isHovering && !user.isFriend && !user.isPendingFriendRequest && (
                <button onClick={handleSendFriendRequestClick}>Send Friend Request</button>
            )}
        </div>
    );
};

export default UserCard;