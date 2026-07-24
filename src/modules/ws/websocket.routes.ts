import { FastifyPluginAsync } from "fastify";

import { handleMessage } from "../../websocket/message.handler.js";
import { PrismaClient } from "@prisma/client";
import { DocumentRepository } from "../document/document.repository.js";

const websocketRoutes: FastifyPluginAsync = async (

	fastify

) => {

	fastify.get(

		"/ws",

		{

			websocket: true,

		},

		(socket) => {

			socket.on(

				"message",

				(message) => {
					const prisma = new PrismaClient();

					const documentRepository = new DocumentRepository(prisma);
					handleMessage(
						socket,
						message,
						documentRepository

					);

				}

			);

		}

	);

};

export default websocketRoutes;
