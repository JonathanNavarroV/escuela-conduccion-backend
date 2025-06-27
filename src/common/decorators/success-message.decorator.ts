import { SetMetadata } from "@nestjs/common";

/**
 * Crea un decorador que asigna un metadata key para mensajes de éxito.
 *
 * Descripción detallada:
 * - Recibe una clave de mensaje.
 * - Usa SetMetadata para almacenar esa clave bajo "successMessageKey".
 * - Se usa típicamente para decorar métodos o controladores con un mensaje de éxito asociado.
 *
 * @param {string} messageKey - Clave del mensaje de éxito que se asignará como metadata.
 *
 * @returns {MethodDecorator} Decorador que agrega el metadata con la clave proporcionada.
 */
export const SuccessMessageKey = (messageKey: string) =>
	SetMetadata("successMessageKey", messageKey);
