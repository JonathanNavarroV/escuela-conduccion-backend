import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
	public constructor(
		private reflector: Reflector, // Se inyecta el reflector para poder leer la metadata
	) {}

	/**
	 * Intercepta la respuesta HTTP para envolverla en un objeto con mensaje, código de estado y datos.
	 *
	 * Descripción detallada:
	 * - Obtiene el objeto response del contexto HTTP.
	 * - Extrae un mensaje de éxito desde la metadata si está definido en el handler.
	 * - Intercepta la respuesta del siguiente handler en la cadena.
	 * - Envuelve la respuesta original en un objeto que incluye:
	 *    - `messageKey`: clave del mensaje de éxito (o undefined si no existe).
	 *    - `statusCode`: código HTTP de la respuesta.
	 *    - `data`: datos originales de la respuesta o `null` si no hay datos.
	 * - Facilita respuestas uniformes con mensajes y estructura consistente para el frontend.
	 *
	 * @param {ExecutionContext} context - Contexto de ejecución del interceptor.
	 * @param {CallHandler} next - Handler siguiente en la cadena de interceptores.
	 *
	 * @returns {Observable<any>} Observable que emite la respuesta interceptada y modificada.
	 */
	public intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<any> {
		const response = context.switchToHttp().getResponse();

		// Se obtiene el mensaje de éxito desde la metadata si es que existe
		const successMessageKey = this.reflector.get<string>(
			"successMessageKey",
			context.getHandler(),
		);

		return next.handle().pipe(
			map((data) => {
				return {
					messageKey: successMessageKey,
					statusCode: response.statusCode,
					data: data ?? null,
				};
			}),
		);
	}
}
