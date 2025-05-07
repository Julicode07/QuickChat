import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const register = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const userExists = await User.findOne({ $or: [{ email }, { name }] });
        if (userExists) {
            return res.status(400).json({ message: "Usuario o correo ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            lastLogin: new Date(),
        });

        await newUser.save();

        generateTokenAndSetCookie(res, newUser._id);

        res.status(201).json({
            success: true, message: "User created successfully", user: {
                ...newUser._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
};

export const login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { name: identifier }],
        });

        if (!user) {
            return res.status(400).json({
                typeMessage: "user",
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                typeMessage: "password",
                success: false,
                message: "Contraseña incorrecta"
            });
        }

        generateTokenAndSetCookie(res, user._id);

        user.isActive = true;
        user.lastLogin = new Date();
        await user.save();

        res.json({
            message: "Login exitoso",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                showActiveStatus: user.showActiveStatus,
                showLastSeen: user.showLastSeen,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error en el login" });
    }
};

export const getMe = (req, res) => {
    if (!req.user) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({ success: true, user: req.user });
};


export const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.isActive = false;
        await user.save();

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        });
        res.json({ message: "Logout exitoso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al cerrar sesión" });
    }
};
