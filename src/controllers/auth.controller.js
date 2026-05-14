import userRepository from '../repositories/user.repository.js';
import ServerError from '../helpers/serverError.helper.js';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../helpers/email.helper.js';

class AuthController {
    async register(req, res) {
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

            const hashed_password = await bcrypt.hash(password, 12);

            const newUser = await userRepository.create(nombre, email, hashed_password);

            sendVerificationEmail(email);

            return res.status(201).json({
                ok: true,
                message: "Usuario registrado. Por favor, verifica tu email.",
                status: 201,
                data: {
                    user: {
                        id: newUser._id,
                        nombre: newUser.nombre,
                        email: newUser.email
                    }
                }
            });

        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    message: error.message
                });
            }
        }
    }

    async verifyEmail(req, res) {
        try {
            const { email } = req.query;

            if (!email) {
                throw new ServerError("Falta el email de verificación", 400);
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                throw new ServerError("Usuario no encontrado", 404);
            }

            if (user.email_verificado) {
                throw new ServerError("Este email ya ha sido verificado", 400);
            }

            await userRepository.updateById(user._id, { email_verificado: true });

            return res.status(200).json({
                ok: true,
                message: "Email verificado correctamente. ¡Ya puedes usar tu cuenta!"
            });

        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    message: error.message
                });
            }
        }
    }
}

const authController = new AuthController();
export default authController;