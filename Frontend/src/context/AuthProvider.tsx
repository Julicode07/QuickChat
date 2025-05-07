import {
    createContext,
    useEffect,
    useState,
    ReactNode
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextType {
    authed: boolean;
    loading: boolean;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (
        identifier: string,
        password: string
    ) => Promise<{ success: boolean; typeMessage: string; message: string }>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authed, setAuthed] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/me`,
                    { credentials: "include" }
                );
                const data = await res.json();
                if (res.ok && data.success) {
                    setAuthed(true);
                } else {
                    setAuthed(false);
                }
            } catch (error) {
                console.error("Error checking auth:", error);
                setAuthed(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ name, email, password }),
                }
            );
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Register failed");
            }

            const from = (location.state as { from?: Location })?.from?.pathname || "/login";
            navigate(from, { replace: true });
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Ocurrió un error inesperado");
            }
        }
    };

    const login = async (identifier: string, password: string) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ identifier, password }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    typeMessage: data.typeMessage || 'unknown',
                    message: data.message || "Error durante el inicio de sesión",
                };
            }

            setAuthed(true);
            const from = (location.state as { from?: Location })?.from?.pathname || "/";
            navigate(from, { replace: true });

            return {
                success: true,
                typeMessage: '',
                message: "Inicio de sesión exitoso",
            };
        } catch (error) {
            console.error("Error durante el login:", error);
            return {
                success: false,
                typeMessage: 'unknown',
                message: "Ocurrió un error inesperado",
            };
        }
    };

    const logout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            });
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setAuthed(false);
            navigate("/login", { replace: true });
        }
    };

    return (
        <AuthContext.Provider value={{ authed, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
