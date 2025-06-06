import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: process.env.FRONTEND_URL,
		methods: "GET,PATCH,POST,DELETE",
		credentials: true, // Permite el envío de credenciales mediante la cabecera
	});

	app.useGlobalPipes(new ValidationPipe()); // Aplica validaciones a las peticiones entrantes para validar datos a nivel global
	const reflector = app.get(Reflector);
	app.useGlobalInterceptors(new ResponseInterceptor(reflector)); // Se inyecta el reflector en el interceptor

	// Configuración de Swagger
	const config = new DocumentBuilder()
		.setTitle("Escuela de conducción API")
		.setDescription(
			"API general para la gestión de recursos y operaciones de la plataforma",
		)
		.setVersion("0.1")
		.addBearerAuth()
		.build();

	// Generar el documento basado en la configuración anterior
	const swaggerDocument = SwaggerModule.createDocument(app, config);

	// Configuración de la ruta de documentación
	SwaggerModule.setup("api", app, swaggerDocument, {
		yamlDocumentUrl: "swagger/yaml",
	});

	await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
