import React, { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { AnimatePresence, motion } from "framer-motion";
const Background = React.lazy(() => import("../components/Background"));
import Loader from "../components/Loader";
import MessageStatus from "../Icons/MessageStatus";
import SearchInput from "../components/SearchInput";
import chats, { Chat, filterChats } from "../utils/chatUtils";

function Homepage() {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Chat[]>([]);
    const isMobile = useIsMobile();
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    useEffect(() => {
        const filteredChats = filterChats(chats, searchTerm);
        setResults(filteredChats);
    }, [searchTerm]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <>
            {loading ? <Loader /> :
                <Background>
                    <div className="relative z-50 flex h-full">
                        <aside className="flex flex-col gap-1 w-full md:w-1/4 text-white">
                            <div className="flex items-center gap-1 pt-4 pb-2 px-4 border-b-2 border-slate-900">
                                <img src="/quickchat.webp" className="w-8 h-8" alt="Logo Quick Chat" />
                                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer">Quick Chat</h2>
                            </div>
                            <div>
                                {/* SEARCH INPUT */}
                                <div className="sticky top-0 bg-transparent backdrop-blur-xl px-5 pb-3">
                                    <div className="space-y-2">
                                        <h1 className="text-xl font-semibold">Chats</h1>
                                        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                                    </div>
                                </div>
                                <ul className="max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden w-full">
                                    {/* CHATS */}
                                    {results.length > 0 ? (
                                        results.map((chat) => (
                                            <motion.a
                                                {...(isMobile ? { href: `/chat/${chat.id}` } : { onClick: () => setSelectedChat(chat) })}
                                                key={chat.id}
                                                className="flex gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer font-normal w-full"
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -50 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="flex items-center justify-center bg-gray-300 h-12 w-12 text-gray-500 rounded-full ">
                                                    <i className={`${chat.img} text-2xl`}></i>
                                                </div>
                                                <div className="flex flex-col justify-center w-[calc(100%-4.5rem)]">
                                                    <p className="text-base font-normal truncate">{chat.name}</p>
                                                    <div className="flex gap-1 w-full">
                                                        <span className="flex items-center justify-center">
                                                            <MessageStatus status="delivered" isSeen={false} />
                                                        </span>
                                                        <div className="flex items-end w-full">
                                                            <p className="pt-1 text-sm text-gray-500 font-semibold truncate" title={chat.message}>{chat.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.a>
                                        ))
                                    ) : (
                                        <li className="mb-3 p-2 ml-3 font-semibold">No tienes chats recientes</li>
                                    )}
                                </ul>
                            </div>
                        </aside>

                        {/* CHAT VIEW */}
                        <div className="w-3/4 text-white hidden md:block transition-all duration-300">
                            <AnimatePresence mode="wait" initial={false}>
                                {selectedChat ? (
                                    <motion.div
                                        key={`chatView-${selectedChat.id}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.1 }}
                                        className="relative flex flex-col justify-between h-full bg-gray-900 text-gray-100"
                                    >
                                        <nav className="absolute top-0 left-0 flex gap-3 items-center px-3 py-3 w-full bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
                                            <i
                                                className="ri-arrow-left-line text-xl cursor-pointer text-blue-500 hover:text-blue-700 font-bold transition duration-300"
                                                onClick={() => setSelectedChat(null)}
                                            ></i>
                                            <div className="flex gap-3 items-center">
                                                <motion.div
                                                    key={`icon-${selectedChat.id}`}
                                                    initial={{ opacity: 0.5 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0.5 }}
                                                    transition={{ duration: 0.2 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="flex items-center justify-center bg-zinc-500 h-8 w-8 text-white rounded-full shadow-md"
                                                >
                                                    <i className={`${selectedChat.img} text-xl`}></i>
                                                </motion.div>
                                                <motion.span
                                                    key={`name-${selectedChat.id}`}
                                                    initial={{ opacity: 0.5 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0.5 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-lg font-semibold text-zinc-100"
                                                >
                                                    {selectedChat.name}
                                                </motion.span>
                                            </div>
                                        </nav>

                                        <div className="bg-slate-900/20 h-full overflow-y-auto pt-16 px-4 pb-4">{selectedChat.message}</div>
                                        <div className="h-20 w-full bg-gray-800/60 backdrop-blur-md border-t border-gray-700">
                                            <div className="flex gap-2 items-center justify-between px-4 py-4">
                                                <input
                                                    type="text"
                                                    className="w-full bg-gray-700 text-gray-100 placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                                    placeholder="Escribe un mensaje..."
                                                />
                                                <button className="bg-blue-500 hover:bg-blue-600 transition text-white rounded-full px-4 py-2 shadow">
                                                    Enviar
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholderView"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.1 }}
                                        className="flex flex-col items-center justify-center h-full"
                                    >
                                        <h2 className="text-2xl font-bold">Selecciona un chat para comenzar</h2>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>
                </Background>
            }
        </>
    );
}

export default Homepage;
