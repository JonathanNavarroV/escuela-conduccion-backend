import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "interceptors/response.interceptor";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe()); // Aplica validaciones a las peticiones entrantes para validar datos a nivel global
	app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector))); // Se inyecta el reflector en el interceptor

	await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
