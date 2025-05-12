import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "interceptors/response.interceptor";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector))); // Se inyecta el reflector en el interceptor

	await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
