import { motion } from 'framer-motion'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(identifier, password);
    };

    return (
        <div>
            <form onSubmit={handleSignIn} className='space-y-5'>
                <motion.div
                    className='space-y-2'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className='space-y-2'>
                        <Label htmlFor="identifier">Usuario o Correo</Label>
                        <Input id="identifier" type="identifier" placeholder="Ingrese su usuario o correo" onChange={(e) => setIdentifier(e.target.value)} />
                    </div>
                </motion.div>

                <motion.div
                    className='space-y-2'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className='flex items-center justify-between'>
                        <Label htmlFor="password">Contraseña</Label>
                    </div>
                    <div className='relative'>
                        <Input type={showPassword ? "text" : "password"} id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
                        <motion.button
                            type="button"
                            aria-label="toggle password visibility"
                            initial={false}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer w-6 h-6 flex items-center justify-center"
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
                    className='flex items-center justify-between'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <div className='flex items-center gap-2'>
                        <Checkbox id="terms" className='cursor-pointer' />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remember me
                        </label>
                    </div>
                    <div>
                        <p>
                            No tienes una cuenta?{" "}
                            <motion.a
                                href="/register"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="font-medium text-black hover:underline"
                            >
                                Registrate
                            </motion.a>
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.2 }}
                >
                    <Button type="submit" className='w-full h-12 bg-black text-white hover:bg-black/90 cursor-pointer'>Iniciar Sesión</Button>
                </motion.div>
            </form>
        </div>
    )
}
