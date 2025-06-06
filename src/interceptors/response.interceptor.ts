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
	constructor(
		private reflector: Reflector, // Se inyecta el reflector para poder leer la metadata
	) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
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
