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
    login: (email: string, password: string) => Promise<void>;
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
                throw new Error(data.message || "Login failed");
            }

            setAuthed(true);
            const from = (location.state as { from?: Location })?.from?.pathname || "/";
            navigate(from, { replace: true });
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Ocurrió un error inesperado");
            }
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
        <AuthContext.Provider value={{ authed, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
