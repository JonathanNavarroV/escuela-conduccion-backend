import { ClassConstructor, plainToInstance } from "class-transformer";

/**
 * Transforma un objeto plano en una instancia de un DTO,
 * excluyendo las propiedades no expuestas (según `@Expose()`).
 *
 * Útil para respuestas que devuelven un solo objeto.
 *
 * @template T - Tipo del DTO destino.
 * @param {ClassConstructor<T>} dtoClass - La clase DTO para la transformación.
 * @param {object} data - El objeto plano a transformar.
 * @returns {T} Instancia del DTO con solo las propiedades expuestas.
 */
export function transformResponseSingle<T>(
	dtoClass: ClassConstructor<T>,
	data: object,
): T {
	return plainToInstance(dtoClass, data, {
		excludeExtraneousValues: true,
	});
}

/**
 * Transforma un arreglo de objetos planos en un arreglo de instancias de un DTO,
 * excluyendo las propiedades no expuestas (según `@Expose()`).
 *
 * Útil para respuestas que devuelven listas.
 *
 * @template T - Tipo del DTO destino.
 * @param {ClassConstructor<T>} dtoClass - La clase DTO para la transformación.
 * @param {object[]} data - El arreglo de objetos planos a transformar.
 * @returns {T[]} Arreglo de instancias del DTO con solo las propiedades expuestas.
 */
export function transformResponseArray<T>(
	dtoClass: ClassConstructor<T>,
	data: object[],
): T[] {
	return plainToInstance(dtoClass, data, {
		excludeExtraneousValues: true,
	});
}
