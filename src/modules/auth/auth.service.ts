import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { I18nService } from "nestjs-i18n";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly i18n: I18nService,
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	/**
	 * Autentica a un usuario y retorna un token JWT si las credenciales son válidas.
	 *
	 * @param email - Correo electrónico del usuario.
	 * @param password - Contraseña del usuario.
	 * @returns Un objeto con el token de acceso generado.
	 * @throws {UnauthorizedException} Si las credenciales son inválidas.
	 */
	async signIn(
		email: string,
		password: string,
	): Promise<{ access_token: string }> {
		const user = await this.userService.findOneByEmail(email);
		if (user?.password !== password) {
			throw new UnauthorizedException(
				this.i18n.translate("auth.invalid_credentials"),
			);
		}

		// Se crea un payload con el ID e email del usuario autenticado para generar el token
		const payload = { sub: user.id, email: user.email };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
