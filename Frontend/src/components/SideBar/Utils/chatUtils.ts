export interface Chat {
    id: number;
    img: string;
    name: string;
    message: string;
}

export const filterChats = (chats: Chat[], searchTerm: string): Chat[] => {
    return chats.filter((chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) || chat.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

const chats: Chat[] = [
    { id: 1, img: 'ri-user-fill', name: 'Santiago Garcia', message: 'Oe mano' },
    { id: 2, img: 'ri-user-fill', name: 'Isabel', message: 'Hola' },
    { id: 3, img: 'ri-user-fill', name: 'Andres', message: 'hola' },
    { id: 4, img: 'ri-user-fill', name: 'Gonza', message: 'hola' },
    { id: 5, img: 'ri-user-fill', name: 'Felipe Alzate', message: 'hola' },
];

export default chats;