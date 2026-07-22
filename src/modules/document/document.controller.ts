import {
	FastifyReply,
	FastifyRequest
} from "fastify";

import {
	createDocumentSchema
} from "./document.schema";

import {
	DocumentService
} from "./document.service";


export class DocumentController {


	constructor(
		private documentService: DocumentService
	) { }



	create =
		async (
			request: FastifyRequest,
			reply: FastifyReply
		) => {


			const body =
				createDocumentSchema.parse(
					request.body
				);



			const document =
				await this.documentService.create(
					body,
					request.user.id
				);



			return reply
				.code(201)
				.send({
					document
				});
		};




	delete =
		async (
			request: FastifyRequest,
			reply: FastifyReply
		) => {


			const {
				id
			} = request.params as {
				id: string;
			};



			await this.documentService.delete(
				id,
				request.user.id
			);



			return reply.code(204).send();
		};
}
