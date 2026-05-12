import express from 'express';
import userRepository from '../repositories/user.repository.js';
import ServerError from '../helpers/serverError.helper.js';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || nombre.length <= 2) {
            throw new ServerError("El nombre debe tener más de 2 caracteres", 400);
        }


        if (!password || password.length < 6) {
            throw new ServerError("La contraseña debe tener al menos 6 caracteres", 400);
        }

        const userExists = await userRepository.getByEmail(email);
        if (userExists) {
            throw new ServerError("El email ya se encuentra registrado", 400);
        }

        const newUser = await userRepository.create(nombre, email, password);

        res.status(201).json({
            ok: true,
            message: "Usuario registrado con éxito",
            data: {
                id: newUser._id,
                nombre: newUser.nombre,
                email: newUser.email
            }
        });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            ok: false,
            message: error.message
        });
    }
});

export default authRouter;