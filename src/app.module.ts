import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "config/env-config";
import { AuthModule } from "./modules/auth/auth.module";
import { BranchesModule } from "./modules/branches/branches.module";
import { LocationsModule } from "./modules/locations/locations.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
	imports: [
		// Se configuran las variables de entorno
		ConfigModule.forRoot({
			envFilePath: `./env/${process.env.NODE_ENV}.env`,
			load: [config],
			isGlobal: true, // Aplica la configuración a toda la aplicación
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
			synchronize: false,
			options: {
				encrypt: true, // Necesario para conexiones SSL con SQL Server
				trustServerCertificate: true, // Desactiva la validación del certificado para conexiones de SQL Server
			},
		}),
		UsersModule,
		AuthModule,
		BranchesModule,
		LocationsModule,
	],
})
export class AppModule {}
