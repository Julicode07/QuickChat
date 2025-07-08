import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";
import MessageStatus from "../Icons/MessageStatus";
import SearchInput from "../components/HomePage/SearchInput";
import chats, { Chat, filterChats } from "../utils/chatUtils";
import ModalBackground from "@/components/HomePage/ModalBackground";
import NewChatModal from "@/components/Chats/NewChat";

const Background = React.lazy(() => import("../components/HomePage/Background"));

interface User {
  name: string;
  email: string;
}

function Homepage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const isMobile = useIsMobile();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [visibleHeight, setVisibleHeight] = useState(window.innerHeight);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showModalConfirmLogout, setShowModalConfirmLogout] = useState(false);
  const [showModalLogout, setShowModalLogout] = useState(false);
  const [showModalNewChat, setShowModalNewChat] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/me`,
          { credentials: "include" }
        );
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error verificando autenticación:", err);
        setUser(null);
      }
    };

    checkAuth();
  }, []);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setResults(filterChats(chats, searchTerm));
  }, [searchTerm]);

  useEffect(() => {
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      setVisibleHeight(currentHeight);
      setIsKeyboardOpen(isMobile && initialHeight - currentHeight > 150);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isMobile]);

  const handleConfirmLogout = async () => {
    setIsDropdownOpen(false);
    setShowModalConfirmLogout(true);

  };

  const handleLogout = async () => {
    setShowModalConfirmLogout(false);
    setShowModalLogout(true);

    setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/logout`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.ok) {
          setUser(null);
          window.location.href = "/login";
        } else {
          console.error("Fallo al cerrar sesión:", response.statusText);
        }
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }, 2000);
  };


  return (
    <Background>
      <div className="relative z-50 flex h-full overflow-hidden">
        <aside className="flex flex-col gap-1 w-full md:w-1/4 text-white relative">
          <button onClick={() => setShowModalNewChat(true)} className="absolute w-10 h-10 rounded-full bg-blue-500 bottom-4 right-4 flex items-center justify-center">
            <i className="ri-add-fill text-white text-2xl cursor-pointer"></i>
          </button>
          <div className="flex justify-between gap-1 py-3 pl-3 pr-4 border-b-2 border-slate-900">
            <div className="flex items-center gap-1">
              <img src="/quickchat.webp" className="w-8 h-8" alt="Logo Quick Chat" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer">
                Quick Chat
              </h2>
            </div>
            {
              user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="h-8 w-8 rounded-full bg-zinc-300 my-auto cursor-pointer"
                  >
                    <i className="ri-user-fill text-xl text-zinc-600"></i>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-40 bg-slate-800 shadow-lg rounded-xl z-10 overflow-hidden"
                      >
                        <div >
                          <p className="px-4 py-2 text-sm text-white flex flex-col gap-1">
                            <span className="font-semibold">{user.name}</span>
                            <span className="text-xs">{user.email}</span>
                          </p>
                        </div>
                        <ul className="bg-slate-700 text-sm text-white">
                          <li className="px-4 py-2 hover:bg-slate-600 cursor-pointer">Perfil</li>
                          <li className="px-4 py-2 hover:bg-slate-600 cursor-pointer">Configuración</li>
                          <li className="px-4 py-2 hover:bg-slate-600 cursor-pointer" onClick={handleConfirmLogout}>Cerrar sesión</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <p></p>
              )
            }

            {showModalConfirmLogout && (
              <AnimatePresence>
                <ModalBackground>
                  <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl text-center max-w-md w-full">
                    <h2 className="text-3xl font-bold mb-2">
                      ¿Cerrar sesión?
                    </h2>
                    <p className="mb-6 text-slate-300">
                      ¿Estás seguro de que deseas cerrar tu sesión?
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors cursor-pointer"
                      >
                        Sí, cerrar sesión
                      </button>
                      <button
                        onClick={() => setShowModalConfirmLogout(false)}
                        className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </ModalBackground>
              </AnimatePresence>

            )}

            {showModalLogout && (
              <AnimatePresence>
                <ModalBackground>
                  <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl text-center max-w-md w-full">
                    <h2 className="text-3xl font-bold mb-2">Cerrando sesión</h2>
                    <p className="text-slate-300">Espera un momento...</p>
                    <div className="flex justify-center mt-4">
                      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                </ModalBackground>
              </AnimatePresence>
            )}

            {showModalNewChat && (
              <AnimatePresence>
                <ModalBackground>
                  <NewChatModal
                    show={showModalNewChat}
                    onClose={() => setShowModalNewChat(false)}
                    onSelectChat={(chat) => {
                      setSelectedChat(chat);
                    }}
                  />
                </ModalBackground>
              </AnimatePresence>
            )}
          </div>
          <div className="sticky top-0 px-4 pt-1 pb-2 backdrop-blur-xl">
            <h1 className="text-xl font-semibold mb-2">Chats</h1>
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <ul className="max-h-[calc(100vh-10rem)] overflow-y-auto w-full">
            {results.length > 0 ? (
              results.map((chat) => (
                <motion.a
                  key={chat.id}
                  className="flex gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center justify-center bg-gray-300 h-12 w-12 text-gray-500 rounded-full">
                    <i className={`${chat.img} text-2xl`}></i>
                  </div>
                  <div className="flex flex-col justify-center w-[calc(100%-3.5rem)]">
                    <p className="text-base truncate">{chat.name}</p>
                    <div className="flex gap-1">
                      <MessageStatus status="delivered" isSeen={false} />
                      <p className="pt-1 text-sm text-gray-500 truncate" title={chat.message}>
                        {chat.message}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))
            ) : (
              <li className="mb-3 p-2 ml-3 font-semibold">No tienes chats recientes</li>
            )}
          </ul>
        </aside>

        <AnimatePresence mode="wait" initial={false}>
          {selectedChat ? (
            isMobile ? (
              <motion.section
                key={`mobile-${selectedChat.id}`}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-50 md:hidden bg-gray-900 text-white flex flex-col"
                style={{ height: isKeyboardOpen ? `${visibleHeight}px` : '100%' }}
              >
                <header className="flex items-center gap-3 px-4 py-3 bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
                  <i className="ri-arrow-left-line text-2xl text-blue-500 cursor-pointer" onClick={() => setSelectedChat(null)}></i>
                  <div className="flex items-center gap-3">
                    <div className="bg-zinc-500 h-8 w-8 rounded-full flex items-center justify-center">
                      <i className={`${selectedChat.img} text-lg`}></i>
                    </div>
                    <span className="text-base font-medium">{selectedChat.name}</span>
                  </div>
                </header>
                <main className="flex-1 overflow-y-auto px-4">{selectedChat.message}</main>
                <footer className="bg-gray-800/60 border-t border-gray-700 px-4 py-3">
                  <form className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="flex-1 bg-gray-700 text-gray-100 rounded-full px-4 py-2"
                      placeholder="Escribe un mensaje..."
                    />
                    <button type="submit" className="bg-blue-600 text-white rounded-full px-4 py-2 flex items-center gap-2">
                      <i className="ri-send-plane-fill text-xl"></i>
                      <span className="hidden sm:inline">Enviar</span>
                    </button>
                  </form>
                </footer>
              </motion.section>
            ) : (
              <motion.section
                key={`desktop-${selectedChat.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex flex-col w-3/4 bg-gray-900 text-white"
              >
                <header className="flex items-center gap-3 px-3 py-3 bg-gray-800/80 border-b border-gray-700">
                  <i className="ri-arrow-left-line text-xl text-blue-500 cursor-pointer" onClick={() => setSelectedChat(null)}></i>
                  <div className="flex gap-3 items-center">
                    <div className="bg-zinc-500 h-8 w-8 rounded-full flex items-center justify-center">
                      <i className={`${selectedChat.img} text-xl`}></i>
                    </div>
                    <span className="text-lg font-semibold">{selectedChat.name}</span>
                  </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4">{selectedChat.message}</main>
                <footer className="h-20 bg-gray-800/60 border-t border-gray-700 px-4 py-4">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="flex-1 bg-gray-700 text-gray-100 rounded-full px-4 py-2 active:outline-none focus:outline-none"
                      placeholder="Escribe un mensaje..."
                    />
                    <button className="bg-blue-500 text-white rounded-full px-3 py-2">
                      <i className="ri-send-plane-fill text-2xl"></i>
                    </button>
                  </div>
                </footer>
              </motion.section>
            )
          ) : (
            <motion.section
              key="placeholderView"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:flex w-3/4 items-center justify-center bg-slate-900 text-white"
            >
              <h2 className="text-2xl font-bold">Selecciona un chat para comenzar</h2>
            </motion.section>
          )}
        </AnimatePresence>
      </div >
    </Background >
  );
}

export default Homepage;
