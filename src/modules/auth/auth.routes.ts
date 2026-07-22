import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "../user/user.repository";


export async function AuthRoutes(
	fastify: FastifyInstance
) {


	const userRepository =
		new UserRepository(
			fastify.prisma
		);


	const authService =
		new AuthService(
			userRepository
		);


	const controller =
		new AuthController(
			authService
		);



	fastify.post(
		"/register",
		controller.register
	);



	fastify.post(
		"/login",
		controller.login
	);

}
