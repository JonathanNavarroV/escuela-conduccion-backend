import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SuccessMessageKey } from "src/common/decorators/success-message.decorator";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@ApiOperation({
		summary: "Iniciar sesión",
		description:
			"Autentica al usuario y retorna un JWT si las credenciales son correctas.",
	})
	@ApiResponse({
		status: 200,
		description: "Inicio de sesión exitoso. Devuelve un token de acceso.",
		schema: {
			example: {
				access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			},
		},
	})
	@ApiResponse({
		status: 401,
		description: "Credenciales inválidas.",
	})
	@HttpCode(HttpStatus.OK) // Si la solicitud es exitosa, se devuelve un status 200
	@SuccessMessageKey("auth.successful_login")
	signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
		return this.authService.signIn(signInDto.email, signInDto.password);
	}

	@Get("validate-token")
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	validateToken(@Request() _req): { valid: true } {
		return { valid: true };
	}
}
