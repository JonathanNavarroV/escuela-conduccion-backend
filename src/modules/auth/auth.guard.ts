import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	/**
	 * Método del guard que determina si la solicitud puede continuar
	 *
	 * Verifica la validez del token JWT en la cabecera `Authorization`.
	 * Si el token es válido, se añade el payload decodificado a `request["user"]` para que esté disponible en los controladores o servicios posteriores.
	 *
	 * @param context - El contexto de ejecución actual que contiene los metadatos de la solicitud.
	 * @returns `true` si la autenticación fue exitosa.
	 * @throws {UnauthorizedException} Si no se encuentra el token o si es inválido
	 */
	async canActivate(context: ExecutionContext): Promise<boolean> {
		// Se obtiene el objeto Request de la solicitud actual
		const request = context.switchToHttp().getRequest();
		// Se extrae el token de la cabecera de autorización
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException({ messageKey: "auth.unauthorized" });
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get("config.tokenSecret"),
			});
			request["user"] = payload;
		} catch {
			throw new UnauthorizedException({ messageKey: "auth.unauthorized" });
		}

		return true;
	}

	/**
	 * Extrae el token JWT desde la cabecera Authorization del request HTTP.
	 *
	 * Espera que la cabecera tenga el formato: "Bearer <token>".
	 *
	 * @param request - La solicitud HTTP entrante.
	 * @returns El token si está presente y bien formado, de lo contrario retorna `undefined`.
	 */
	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
