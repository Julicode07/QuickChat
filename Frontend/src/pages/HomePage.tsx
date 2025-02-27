import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Background = React.lazy(() => import("../components/Background"));
const Loader = React.lazy(() => import("../components/Loader"));

interface Chat {
    id: number;
    name: string;
}

function Homepage() {
    const [loading, setLoading] = useState(true);
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // Search
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Chat[]>([]);

    const chats: Chat[] = [
        { id: 1, name: 'Santiago Garcia' },
        { id: 2, name: 'Isabel' },
        { id: 3, name: 'Gonza' },
        { id: 4, name: 'Pa' },
        { id: 5, name: 'Mom' },
        { id: 6, name: 'Felipe Alzate' },
        { id: 7, name: 'Nicolas' },
        { id: 8, name: 'Lau' },
        { id: 9, name: 'Santa' },
        { id: 10, name: 'Usme' },
    ];


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setSearchTerm(value);
    };

    useEffect(() => {
        const filteredChats = chats.filter((chat) =>
            chat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredChats);
    }, [searchTerm]);

    const handleClearInput = () => {
        setInputValue('');
        setSearchTerm('');
        setFocused(false);
    };

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
                        <aside className="flex flex-col gap-3 w-1/4 text-white">
                            <div className="sticky top-0 bg-transparent backdrop-blur-xl px-4 pt-4 flex flex-col gap-2">
                                <div className="flex items-center gap-1">
                                    <img src="/quickchat.png" className="w-10 h-10" alt="Logo Quick Chat" />
                                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 cursor-">Quick Chat</h2>
                                </div>
                                <div className="relative flex w-full pl-2 py-1 rounded-md bg-gray-600 text-white group">
                                    <AnimatePresence>
                                        {!focused && (
                                            <motion.div
                                                className="flex justify-center items-center absolute ri-search-line text-white w-6 h-6"
                                                initial={{ rotate: 125 }}
                                                animate={{ rotate: 0 }}
                                                exit={{ rotate: 90, opacity: 0 }}
                                                transition={{ duration: 0.1 }}
                                            >
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {focused && (
                                            <motion.div
                                                className="flex justify-center items-center absolute ri-arrow-left-line text-blue-300 w-6 h-6 cursor-pointer text-xl"
                                                initial={{ rotate: -90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: -90, opacity: 0 }}
                                                transition={{ duration: 0.1 }}
                                                onClick={handleClearInput} // Llamar a la función para borrar el input
                                            ></motion.div>
                                        )}
                                    </AnimatePresence>

                                    <input
                                        type="text"
                                        placeholder={!focused ? "Buscar" : ""}
                                        value={inputValue}
                                        className="relative left-7 focus:border-none focus:outline-none bg-transparent w-full placeholder:hidden"
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        onChange={handleSearchChange}
                                    />
                                    <AnimatePresence>
                                        {inputValue !== '' && (
                                            <motion.div
                                                className="flex justify-center items-center absolute right-2 ri-close-line text-gray-400 w-6 h-6 cursor-pointer text-xl"
                                                initial={{ rotate: -90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: -90, opacity: 0 }}
                                                transition={{ duration: 0.1 }}
                                                onClick={handleClearInput}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <ul className="px-4 pb-4 overflow-y-auto">
                                {results.length > 0 ? (
                                    results.map((chat) => (
                                        <li key={chat.id} className="mb-3 p-2 hover:bg-blue-700 rounded-md cursor-pointer">
                                            {chat.name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="mb-3 p-2">No se encontraron resultados.</li>
                                )}
                            </ul>
                        </aside>

                        <div className="w-3/4 bg-gray-700/20 p-6 text-white">
                            <h1 className="text-3xl mb-4 text-blue-400 font-semibold">Bienvenido al Chat</h1>
                        </div>
                    </div>
                </Background>
            }
        </>
    )
}

export default Homepage;
