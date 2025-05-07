import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const Login = React.lazy(() => import("../components/Auth/Login"));
const Register = React.lazy(() => import("../components/Auth/Register"));

function AuthForm({ activeTab }: { activeTab: string }) {
    const { authed, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (!loading && authed) {
            setShowModal(true);

            const timeout = setTimeout(() => {
                navigate(from, { replace: true });
            }, 4500);

            return () => clearTimeout(timeout);
        }
    }, [authed, loading, navigate, from]);
    return (
        <div className="absolute inset-0 flex justify-center items-center h-full w-full bg-slate-900 overflow-hidden transition-all duration-300">
            <div className="absolute z-0 inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0deg,#10b981_72deg,#6366f1_144deg,#8b5cf6_216deg,#ec4899_288deg,#3b82f6_360deg)] animate-[spin_4s_linear_infinite] opacity-90 blur-[200px]"></div>
            <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_-100%,#ffffff10,transparent)]"></div>
            {/* LOGIN */}
            <div className="relative z-50 flex overflow-hidden min-h-screen w-screen justify-center items-center bg-black/10 backdrop-blur-2xl">

                {showModal ? (
                    <AnimatePresence>
                        <motion.div
                            className="fixed inset-0 bg-black/5 backdrop-blur-xl z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-50"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl text-center max-w-md w-full">
                                <h2 className="text-3xl font-bold mb-2">¡Ya has iniciado sesión!</h2>
                                <p className="text-slate-300">Serás redirigido automáticamente...</p>
                                <div className="flex justify-center mt-4">
                                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <LayoutGroup>
                        <motion.div
                            layout
                            className="bg-slate-800 h-full flex w-full flex-col justify-center p-8 max-w-xl rounded-2xl border border-slate-700 shadow-xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
                        >
                            <motion.div layout className="mx-auto">
                                <motion.div layout className="mb-8">
                                    <motion.h1 layout className="text-4xl font-black tracking-tight text-blue-400 text-center">
                                        {activeTab === "login" ? "Iniciar sesión" : "Crear cuenta"}
                                    </motion.h1>
                                    <motion.p className="text-base font-medium text-slate-300 text-center">
                                        {activeTab === "login"
                                            ? "Accede a tu cuenta para comenzar a chatear"
                                            : "Regístrate para disfrutar de todas las funciones"}
                                    </motion.p>
                                </motion.div>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: activeTab === "login" ? 20 : -20 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
                                >
                                    <Suspense fallback={<div className="text-center text-slate-300">Cargando...</div>}>
                                        {activeTab === "login" ? <Login /> : <Register />}
                                    </Suspense>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </LayoutGroup>
                )}

            </div>
        </div>
    );
}

export default AuthForm;
