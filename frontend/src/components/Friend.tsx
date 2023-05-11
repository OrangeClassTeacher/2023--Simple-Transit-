import { useState } from 'react';

type Props = {
    id: string;
    name: string;
    isFriend: boolean;
    onToggleFriendship: (id: string) => void;
}

const Friend = ({ id, name, isFriend, onToggleFriendship }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFriendshipToggle = async () => {
        setIsLoading(true);

        // Call the parent component's onToggleFriendship function to toggle the friendship status
        await onToggleFriendship(id);

        setIsLoading(false);
    };

    return (
        <div>
            <h3>{name}</h3>
            {isFriend ? (
                <button disabled={isLoading} onClick={handleFriendshipToggle}>
                    Unfriend
                </button>
            ) : (
                <button disabled={isLoading} onClick={handleFriendshipToggle}>
                    Add Friend
                </button>
            )}
        </div>
    );
};

export default Friend;