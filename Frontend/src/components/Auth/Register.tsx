import { motion } from 'framer-motion'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/useAuth'

export default function Register() {
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await register(name, email, password);
    }

    return (
        <div>
            <form onSubmit={handleRegister} className="space-y-5 text-slate-100">
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-200">Usuario</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Ingrese su usuario"
                            className="bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-600"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-200">Correo</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Ingrese su correo"
                            className="bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-600"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-slate-200">Contraseña</Label>
                    </div>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="••••••••"
                            className="bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-600"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <motion.button
                            type="button"
                            aria-label="toggle password visibility"
                            initial={false}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 w-6 h-6 flex items-center justify-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <motion.span
                                key={showPassword ? "eye-off" : "eye"}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </motion.span>
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <p className="text-sm text-slate-300">
                        ¿Tiene una cuenta?{" "}
                        <motion.a
                            href="/login"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="font-medium text-blue-400 hover:text-blue-500 hover:underline"
                        >
                            Iniciar Sesión
                        </motion.a>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.2 }}
                >
                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer"
                    >
                        Registrarse
                    </Button>
                </motion.div>
            </form>
        </div>
    )
}
