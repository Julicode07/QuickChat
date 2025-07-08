import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId, rememberMe = false) => {
    const expiresIn = rememberMe ? "365d" : "1d";
    const maxAge = rememberMe ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: maxAge
    });

    return token;
};