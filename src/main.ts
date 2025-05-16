import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { I18nService } from "nestjs-i18n";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe()); // Aplica validaciones a las peticiones entrantes para validar datos a nivel global
	const reflector = app.get(Reflector);
	const i18n = app.get<I18nService<Record<string, unknown>>>(I18nService);
	app.useGlobalInterceptors(new ResponseInterceptor(reflector, i18n)); // Se inyecta el reflector en el interceptor

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
