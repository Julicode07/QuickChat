import { motion } from 'framer-motion'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../ui/button'

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert("Sign in submitted")
    }

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
                        <Label htmlFor="name">Usuario</Label>
                        <Input id="name" type="name" placeholder="Ingrese su usuario" />
                    </div>
                </motion.div>
                <motion.div
                    className='space-y-2'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className='space-y-2'>
                        <Label htmlFor="email">Correo</Label>
                        <Input id="email" type="email" placeholder="Ingrese su correo" />
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
                        <Input type={showPassword ? "text" : "password"} id="password" placeholder="••••••••" />
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
                    className='flex items-center justify-center'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <p>
                        Tiene una cuenta?{" "}
                        <motion.a
                            href="/login"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="font-medium text-black hover:underline"
                        >
                            Iniciar Sesión
                        </motion.a>
                    </p>
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
