import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
	tokenSecret: process.env.TOKEN_SECRET,
	jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
}));
