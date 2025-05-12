import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { SuccessMessage } from "common/decorators/success-messages.decorator";
import { MESSAGES } from "common/constants/messages";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@SuccessMessage(MESSAGES.TEST)
	getHello(): Promise<string> {
		return this.appService.getHello();
	}
}
