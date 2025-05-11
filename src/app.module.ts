import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import config from "config/env-config";

@Module({
	imports: [
		// Se configuran las variables de entorno
		ConfigModule.forRoot({
			envFilePath: `./env/${process.env.NODE_ENV}.env`,
			load: [config],
			isGlobal: true, // Aplica la configuración a toda la aplicación
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
