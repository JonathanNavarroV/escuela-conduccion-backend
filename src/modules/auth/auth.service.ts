import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { MessageKeys } from "src/common/constants/message-keys.constant";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	public constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	/**
	 * Autentica a un usuario con su email y contraseña, y genera un token JWT.
	 *
	 * Descripción detallada:
	 * - Busca al usuario en la base de datos mediante el email proporcionado.
	 * - Compara la contraseña ingresada con la almacenada usando bcrypt.
	 * - Si el usuario no existe o la contraseña es incorrecta, lanza UnauthorizedException con un mensaje específico.
	 * - Si la autenticación es exitosa, crea un payload con el ID y email del usuario.
	 * - Genera un token JWT firmado asíncronamente con el payload y lo retorna.
	 *
	 * @param {string} email - Email del usuario que intenta autenticarse.
	 * @param {string} password - Contraseña en texto plano para validar.
	 *
	 * @returns {Promise<{ access_token: string }>} Objeto con el token de acceso JWT generado.
	 *
	 * @throws {UnauthorizedException} Cuando el email no existe o la contraseña no coincide.
	 *
	 * @async
	 */
	public async signIn(
		email: string,
		password: string,
	): Promise<{ access_token: string }> {
		const user = await this.userService.findOneEntityByEmail(email);
		if (!user) {
			throw new UnauthorizedException({
				messageKey: MessageKeys.AUTH.INVALID_CREDENTIALS,
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException({
				messageKey: MessageKeys.AUTH.INVALID_CREDENTIALS,
			});
		}

		// Se crea un payload con el ID e email del usuario autenticado para generar el token
		const payload = { sub: user.id, email: user.email };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
