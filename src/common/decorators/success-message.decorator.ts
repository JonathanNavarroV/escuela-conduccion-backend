import { SetMetadata } from "@nestjs/common";

export const SuccessMessageKey = (messageKey: string) =>
	SetMetadata("successMessageKey", messageKey);
