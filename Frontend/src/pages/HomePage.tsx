import React, { useEffect, useState, Suspense, useRef } from "react";
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
  const [visibleHeight, setVisibleHeight] = useState(window.innerHeight);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const chatContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const filteredChats = filterChats(chats, searchTerm);
    setResults(filteredChats);
  }, [searchTerm]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      // Calculate the real viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // Detect keyboard
      if (isMobile) {
        const currentHeight = window.innerHeight;
        const heightDifference = initialHeight - currentHeight;

        // If height is significantly reduced, keyboard is likely open
        if (heightDifference > 150) {
          setIsKeyboardOpen(true);
          setKeyboardHeight(heightDifference);
        } else {
          setIsKeyboardOpen(false);
          setKeyboardHeight(0);
        }

        setVisibleHeight(currentHeight);
      } else {
        setVisibleHeight(window.innerHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isMobile]);

  // Prevent scroll when keyboard opens
  useEffect(() => {
    if (isKeyboardOpen && chatContainerRef.current) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = `${visibleHeight}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isKeyboardOpen, visibleHeight]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Background>
            <div className="relative z-50 flex h-full overflow-hidden">
              <aside className="flex flex-col gap-1 w-full md:w-1/4 text-white">
                <div className="flex items-center gap-1 pt-4 pb-2 px-4 border-b-2 border-slate-900">
                  <img src="/quickchat.webp" className="w-8 h-8" alt="Logo Quick Chat" />
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer">Quick Chat</h2>
                </div>
                <div>
                  <div className="sticky top-0 bg-transparent backdrop-blur-xl px-5 pb-3">
                    <div className="space-y-2">
                      <h1 className="text-xl font-semibold">Chats</h1>
                      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
                  </div>
                  <ul className="max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden w-full">
                    {results.length > 0 ? (
                      results.map((chat) => (
                        <motion.a
                          key={chat.id}
                          className="flex gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer font-normal w-full"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => setSelectedChat(chat)}
                        >
                          <div className="flex items-center justify-center bg-gray-300 h-12 w-12 text-gray-500 rounded-full">
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

              <AnimatePresence mode="wait" initial={false}>
                {selectedChat ? (
                  <>
                    {/* MOBILE */}
                    {isMobile && (
                      <motion.section
                        ref={chatContainerRef}
                        key={`mobile-${selectedChat.id}`}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 z-50 md:hidden bg-gray-900 text-white flex flex-col overflow-hidden"
                        style={{
                          height: isKeyboardOpen ? `${visibleHeight}px` : '100%',
                          maxHeight: isKeyboardOpen ? `${visibleHeight}px` : '100%',
                          overflow: 'hidden'
                        }}
                      >
                        <header className="flex items-center gap-3 px-4 py-3 w-full bg-gray-800/80 backdrop-blur-md border-b border-gray-700 shrink-0">
                          <i
                            className="ri-arrow-left-line text-2xl text-blue-500 hover:text-blue-600 transition cursor-pointer"
                            onClick={() => setSelectedChat(null)}
                          ></i>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center bg-zinc-500 h-8 w-8 text-white rounded-full shadow">
                              <i className={`${selectedChat.img} text-lg`}></i>
                            </div>
                            <span className="text-base font-medium truncate">{selectedChat.name}</span>
                          </div>
                        </header>
                        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-2 px-4">
                          {selectedChat.message}
                        </main>
                        <footer className="w-full bg-gray-800/60 backdrop-blur-md border-t border-gray-700 px-4 py-3 shrink-0">
                          <form className="flex gap-2 items-center">
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-gray-100 text-base placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                              placeholder="Escribe un mensaje..."
                            />
                              <button
                                type="submit"
                                className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all text-white rounded-full px-4 py-2 shadow-md hover:shadow-lg"
                              >
                                <i className="ri-send-plane-fill text-xl group-hover:translate-x-1 transition-transform"></i>
                                <span className="hidden sm:inline">Enviar</span>
                              </button>
                          </form>
                        </footer>
                      </motion.section>
                    )}

                    {/* DESKTOP */}
                    {!isMobile && (
                      <motion.section
                        key={`desktop-${selectedChat.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hidden md:flex flex-col w-3/4 h-full bg-gray-900 text-white"
                      >
                        <header className="flex gap-3 items-center px-3 py-3 w-full bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
                          <i
                            className="ri-arrow-left-line text-xl cursor-pointer text-blue-500 hover:text-blue-700 font-bold transition duration-300"
                            onClick={() => setSelectedChat(null)}
                          ></i>
                          <div className="flex gap-3 items-center">
                            <motion.div
                              key={`desktop-icon-${selectedChat.id}`}
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
                              key={`desktop-name-${selectedChat.id}`}
                              initial={{ opacity: 0.5 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0.5 }}
                              transition={{ duration: 0.2 }}
                              className="text-lg font-semibold text-zinc-100"
                            >
                              {selectedChat.name}
                            </motion.span>
                          </div>
                        </header>

                        <main className="bg-slate-900/20 h-full overflow-y-auto p-4">
                          {selectedChat.message}
                        </main>

                        <footer className="h-20 w-full bg-gray-800/60 backdrop-blur-md border-t border-gray-700">
                          <div className="flex gap-2 items-center justify-between px-4 py-4">
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-gray-100 placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                              placeholder="Escribe un mensaje..."
                            />
                            <button
                              type="submit"
                              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition text-white rounded-full px-2 py-1 shadow"
                            >
                              <i className="ri-send-plane-fill text-2xl"></i>
                            </button>
                          </div>
                        </footer>
                      </motion.section>
                    )}
                  </>
                ) : (
                  <motion.section
                    key="placeholderView"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hidden md:flex w-3/4 items-center justify-center h-full bg-slate-900 text-white"
                  >
                    <h2 className="text-2xl font-bold">Selecciona un chat para comenzar</h2>
                  </motion.section>
                )}
              </AnimatePresence>
            </div>
          </Background>
        </Suspense>
      )}
    </>
  );
}

export default Homepage;