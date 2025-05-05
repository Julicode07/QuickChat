import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const userExists = await User.findOne({ $or: [{ email }, { name }] });
        if (userExists) {
            return res.status(400).json({ message: "Usuario o correo ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            lastLogin: new Date(),
        });

        await newUser.save();
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
});

router.post("/login", async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { name: identifier }],
        });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        user.isActive = true;
        user.lastLogin = new Date();
        await user.save();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 3600000,
        });

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
});

router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            showActiveStatus: user.showActiveStatus,
            showLastSeen: user.showLastSeen,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener los datos del usuario" });
    }
});

router.post("/logout", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.isActive = false;
        await user.save();

        res.clearCookie("token");

        res.json({ message: "Logout exitoso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al cerrar sesión" });
    }
});

export default router;
