import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });

export default new DataSource({
	type: "mssql",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [`src/**/*.entity{.ts,.js}`],
	migrations: ["src/migrations/**/*{.ts,.js}"],
	synchronize: false,
	options: {
		encrypt: true, // Necesario para conexiones SSL con SQL Server
		trustServerCertificate: true, // Desactiva la validación del certificado para conexiones de SQL Server
	},
});
