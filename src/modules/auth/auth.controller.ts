import { FastifyReply, FastifyRequest } from "fastify";
import {
	loginSchema,
	registerSchema
} from "./auth.schema";

import { AuthService } from "./auth.service";


export class AuthController {

	constructor(
		private authService: AuthService
	) { }



	register =
		async (
			request: FastifyRequest,
			reply: FastifyReply
		) => {

			const body =
				registerSchema.parse(
					request.body
				);


			const user =
				await this.authService.register(
					body
				);


			return reply
				.code(201)
				.send({
					user
				});
		};




	login =
		async (
			request: FastifyRequest,
			reply: FastifyReply
		) => {


			const body =
				loginSchema.parse(
					request.body
				);


			const user =
				await this.authService.login(
					body
				);


			const token =
				await reply.jwtSign(
					{
						id: user.id,
						email: user.email
					},
					{
						expiresIn: "15m"
					}
				);


			return reply.send({
				user,
				token
			});
		};
}
