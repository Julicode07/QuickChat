import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const Background = React.lazy(() => import("../components/Background"));
import Loader from "../components/Loader";
import MessageStatus from "../Icons/MessageStatus";
import SearchInput from "../components/SideBar/SearchInput";
import chats, { Chat, filterChats } from "../components/SideBar/Utils/chatUtils";

function Homepage() {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Chat[]>([]);


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
                    <div className="relative z-50 flex h-screen">
                        <aside className="flex flex-col gap-1 w-1/4 text-white">
                            <div className="flex items-center gap-1 pt-4 pb-2 px-4 border-b-2 border-slate-900">
                                <img src="/quickchat.webp" className="w-8 h-8" alt="Logo Quick Chat" />
                                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer">Quick Chat</h2>
                            </div>
                            <div>
                                {/* SEACRH INPUT */}
                                <div className="sticky top-0 bg-transparent backdrop-blur-xl px-5 pb-3">
                                    <div className="space-y-2">
                                        <h1 className="text-xl font-semibold">Chats</h1>
                                        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                                    </div>
                                </div>
                                <ul className="max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden w-full">
                                    {/*  CHATS */}
                                    {results.length > 0 ? (
                                        results.map((chat) => (
                                            <motion.div
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
                                            </motion.div>
                                        ))
                                    ) : (
                                        <li className="mb-3 p-2 ml-3 font-semibold">No tienes chats recientes</li>
                                    )}
                                </ul>
                            </div>
                        </aside>

                        <div className="w-3/4 bg-gray-700/20 p-6 text-white">
                            <h1 className="text-3xl mb-4 text-blue-400 font-semibold">Bienvenido al Chat</h1>
                        </div>
                    </div>
                </Background>
            }
        </>
    );
}

export default Homepage;
