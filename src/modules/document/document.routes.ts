import { FastifyInstance } from "fastify";

import {
	DocumentController
} from "./document.controller";

import {
	DocumentService
} from "./document.service";

import {
	DocumentRepository
} from "./document.repository";


export async function DocumentRoutes(
	fastify: FastifyInstance
) {


	const repository =
		new DocumentRepository(
			fastify.prisma
		);



	const service =
		new DocumentService(
			repository
		);



	const controller =
		new DocumentController(
			service
		);



	fastify.post(
		"/",
		{
			preHandler: [
				fastify.authenticate
			]
		},
		controller.create
	);



	fastify.delete(
		"/:id",
		{
			preHandler: [
				fastify.authenticate
			]
		},
		controller.delete
	);
}
