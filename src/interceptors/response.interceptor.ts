import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { I18nService } from "nestjs-i18n";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
	constructor(
		private reflector: Reflector, // Se inyecta el reflector para poder leer la metadata
		private readonly i18n: I18nService,
	) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const response = context.switchToHttp().getResponse();

		// Se obtiene el mensaje de éxito desde la metadata si es que existe
		const successMessage = this.reflector.get<string>(
			"successMessage",
			context.getHandler(),
		);

		return next.handle().pipe(
			map((data) => {
				// Traducir si hay mensaje
				const message = successMessage
					? this.i18n.translate(successMessage, { lang: "es" })
					: null;

				return {
					message,
					statusCode: response.statusCode,
					data: data ?? null,
				};
			}),
		);
	}
}
