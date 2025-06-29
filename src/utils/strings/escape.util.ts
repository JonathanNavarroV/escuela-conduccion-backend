/**
 * Escapa comillas simples duplicándolas en el texto.
 *
 * Descripción detallada:
 * - Reemplaza todas las comillas simples (`'`) por comillas dobles simples (`''`).
 * - Útil para evitar errores en consultas SQL donde las comillas simples deben escaparse.
 *
 * @param {string} text - Texto que puede contener comillas simples.
 *
 * @returns {string} Texto con las comillas simples escapadas.
 */
export function escapeSingleQuotes(text: string): string {
	return text.replace(/'/g, "''");
}
