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
	// Se inyecta el reflector para poder leer la metadata
	constructor(private reflector: Reflector) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const response = context.switchToHttp().getResponse();

		// Se obtiene el mensaje de éxito desde la metadata si es que existe
		const successMessage = this.reflector.get<string>(
			"successMessage",
			context.getHandler(),
		);

		return next.handle().pipe(
			// En caso de éxito
			map((data) => ({
				message: successMessage,
				statusCode: response.statusCode, // Se obtiene el código de estado de la solicitud
				data: data ? data : null,
			})),
		);
	}
}
