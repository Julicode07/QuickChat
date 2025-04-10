import { useParams } from 'react-router-dom';
import chats, { Chat } from '../utils/chatUtils';

const ChatInfo = () => {
    const { id } = useParams<{ id: string }>();

    // Convertimos el id a número antes de comparar
    const chat: Chat | undefined = chats.find((chat) => chat.id === Number(id));

    if (!chat) {
        return <div className="text-white">Chat no encontrado.</div>;
    }

    return (
        <div className="text-white p-4 space-y-4">
            <div className="flex items-center justify-center bg-gray-300 h-12 w-12 text-gray-500 rounded-full ">
                <i className={`${chat.img} text-2xl`}></i>
            </div>
            <h1 className="text-3xl font-bold">{chat.name}</h1>
            <p className="text-gray-400">{chat.message}</p>
        </div>
    );
};

export default ChatInfo;
