import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		UsersModule,
		// Configuración del módulo JWT
		JwtModule.registerAsync({
			// Se utiliza el useFactory para acceder al configService
			useFactory: async (configService: ConfigService) => ({
				global: true,
				secret: configService.get("config.tokenSecret"),
				signOptions: {
					expiresIn: configService.get("config.jwtExpirationTime"),
				},
			}),
			inject: [ConfigService], // Se inyecta el configService en useFactory
		}),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
