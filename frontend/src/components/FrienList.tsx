// src/components/FriendList.tsx

import { useState } from 'react';
import Friend from './Friend';

type Friend = {
    id: string;
    name: string;
    isFriend: boolean;
}

const FriendList = () => {
    const [friends, setFriends] = useState<Friend[]>([
        { id: '1', name: 'Alice', isFriend: false },
        { id: '2', name: 'Bob', isFriend: true },
        { id: '3', name: 'Charlie', isFriend: false },
    ]);

    const handleToggleFriendship = async (id: string) => {
        // Find the friend with the specified ID and toggle the friendship status
        const updatedFriends = friends.map(friend =>
            friend.id === id ? { ...friend, isFriend: !friend.isFriend } : friend
        );

        setFriends(updatedFriends);
    };

    return (
        <div>
            {friends.map(friend => (
                <Friend
                    key={friend.id}
                    id={friend.id}
                    name={friend.name}
                    isFriend={friend.isFriend}
                    onToggleFriendship={handleToggleFriendship}
                />
            ))}
        </div>
    );
};

export default FriendList;
