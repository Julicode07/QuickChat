import { motion } from 'framer-motion'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/useAuth'
import Alert from '../Alert'


export default function Login() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const [typeMessage, setTypeMessage] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await login(identifier, password);

        if (!response.success) {
            setTypeMessage(response.typeMessage);
            setMessage(response.message);
        }
    };
    return (
        <div>
            <form onSubmit={handleLogin} className="space-y-5 text-slate-100">
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="space-y-2">
                        <Label htmlFor="identifier" className="text-slate-200">Usuario o Correo</Label>
                        <Input
                            id="identifier"
                            type="text"
                            placeholder="Ingrese su usuario o correo"
                            className=" text-slate-100 placeholder-slate-400 border border-slate-600"
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                        <p>{typeMessage === 'user' && (
                            <Alert message={message} />
                        )}</p>
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
                            className="text-slate-100 placeholder-slate-400 border border-slate-600"
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
                    <p>{typeMessage === 'password' && (
                        <Alert message={message} />
                    )}
                    </p>
                </motion.div>

                <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <div className="flex items-center gap-2">
                        <Checkbox id="terms" className="cursor-pointer text-blue-600 focus:ring-blue-600" />
                        <label
                            htmlFor="terms"
                            className="text-sm text-slate-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Recuérdame
                        </label>
                    </div>
                    <div>
                        <p className="text-sm text-slate-300">
                            ¿No tienes una cuenta?{" "}
                            <motion.a
                                href="/register"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
                            >
                                Regístrate
                            </motion.a>
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.2 }}
                >
                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    >
                        Iniciar Sesión
                    </Button>
                </motion.div>
            </form>
        </div>
    )
}
