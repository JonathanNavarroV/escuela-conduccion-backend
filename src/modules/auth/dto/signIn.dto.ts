import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInDto {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({
		description: "Correo electrónico del usuario",
		example: "juan.perez@ejemplo.com",
	})
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@ApiProperty({
		description: "Contraseña del usuario (Mínimo 6 caracteres)",
		example: "contraseña.segura.123",
	})
	password: string;
}
