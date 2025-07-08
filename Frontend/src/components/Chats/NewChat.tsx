import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import chats, { Chat } from "@/utils/chatUtils";

export default function NewChatModal({
    show,
    onClose,
    onSelectChat,
}: {
    show: boolean;
    onClose: () => void;
    onSelectChat: (chat: Chat) => void;
}) {
    const [username, setUsername] = useState("");
    const [validatedUser, setValidatedUser] = useState<Chat | null>(null);
    const [error, setError] = useState("");

    const handleValidateUser = () => {
        const trimmed = username.trim().toLowerCase();
        const found = chats.find(
            (chat) => chat.name.toLowerCase() === trimmed
        );

        if (found) {
            setValidatedUser(found);
            setError("");
        } else {
            setValidatedUser(null);
            setError("Usuario no encontrado o nombre incorrecto.");
        }
    };

    const handleSelectChat = () => {
        if (validatedUser) {
            onSelectChat(validatedUser);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-3"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-3xl font-bold">Buscar usuario</h2>
                                <i
                                    onClick={onClose}
                                    className="ri-close-fill text-2xl cursor-pointer"
                                ></i>
                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        placeholder="Ingrese el nombre exacto"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="flex-1 bg-gray-700 text-gray-100 rounded-full px-4 py-3 active:outline-none focus:outline-none"
                                    />
                                    {/* hacer que cuando le de enter busque haga como el enter */}
                                    <button
                                        onClick={handleValidateUser}
                                        className="bg-blue-500 text-white rounded-full px-3 py-2 cursor-pointer"
                                    >
                                        <i className="ri-search-line text-xl"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-500 mb-2">{error}</p>}

                        {validatedUser && (
                            <div>
                                <hr className="mt-2 mb-4 border-slate-600" />
                                <motion.a
                                    onClick={handleSelectChat}
                                    className="p-2 bg-slate-700 rounded-full flex items-center space-x-4 hover:bg-slate-600 cursor-pointer"
                                >
                                    <div className="flex items-center justify-center bg-gray-300 h-12 w-12 text-gray-500 rounded-full">
                                        <i className="ri-user-fill text-2xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold">{validatedUser.name}</p>
                                    </div>
                                </motion.a>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
