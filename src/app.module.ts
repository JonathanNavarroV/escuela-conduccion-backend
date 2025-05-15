import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "config/env-config";
import { AcceptLanguageResolver, I18nModule } from "nestjs-i18n";
import * as path from "path";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
	imports: [
		// Se configuran las variables de entorno
		ConfigModule.forRoot({
			envFilePath: `./env/${process.env.NODE_ENV}.env`,
			load: [config],
			isGlobal: true, // Aplica la configuración a toda la aplicación
		}),

		// Se configura i18n para multilenguaje en las respuestas
		I18nModule.forRoot({
			fallbackLanguage: "es", // Idioma por defecto
			loaderOptions: {
				path: path.join(__dirname + "/i18n/"),
				watch: true, // Se recargan automaticamente al modificar los archivos
			},
			resolvers: [AcceptLanguageResolver], // Forma de detectar el idioma
		}),

		// Se configura la conexión ORM a la base de datos SQL Server
		TypeOrmModule.forRoot({
			type: "mssql",
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [__dirname + `/**/**/*.entity{.ts,.js}`],
			synchronize: true,
			options: {
				encrypt: true, // Necesario para conexiones SSL con SQL Server
				trustServerCertificate: true, // Desactiva la validación del certificado para conexiones de SQL Server
			},
		}),
		UsersModule,
		AuthModule,
	],
})
export class AppModule {}
