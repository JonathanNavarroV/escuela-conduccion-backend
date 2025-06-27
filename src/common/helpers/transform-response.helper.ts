import { ClassConstructor, plainToInstance } from "class-transformer";

/**
 * Transforma un objeto plano en una instancia de la clase DTO especificada.
 *
 * Descripción detallada:
 * - Convierte un objeto simple en una instancia tipada usando `plainToInstance`.
 * - Excluye propiedades que no están definidas en la clase DTO para mayor seguridad y claridad.
 * - Útil para mapear datos recibidos (por ejemplo, de una respuesta HTTP) a objetos con validaciones y métodos.
 *
 * @param {ClassConstructor<T>} dtoClass - Clase a la cual se transformará el objeto plano.
 * @param {object} data - Objeto plano con los datos a transformar.
 *
 * @returns {T} Instancia de la clase DTO con los datos mapeados.
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
 * Transforma un arreglo de objetos planos en un arreglo de instancias de la clase DTO especificada.
 *
 * Descripción detallada:
 * - Convierte un array de objetos simples en instancias tipadas usando `plainToInstance`.
 * - Excluye propiedades no definidas en la clase DTO para asegurar la integridad de los datos.
 * - Útil para mapear listas de datos (por ejemplo, respuestas HTTP con múltiples elementos) a objetos con validaciones y métodos.
 *
 * @param {ClassConstructor<T>} dtoClass - Clase a la cual se transformarán los objetos planos.
 * @param {object[]} data - Array de objetos planos con los datos a transformar.
 *
 * @returns {T[]} Array de instancias de la clase DTO con los datos mapeados.
 */
export function transformResponseArray<T>(
	dtoClass: ClassConstructor<T>,
	data: object[],
): T[] {
	return plainToInstance(dtoClass, data, {
		excludeExtraneousValues: true,
	});
}
