import { WebSocket } from "ws";

import { ClientMessage } from "./protocol.js";

import { documentManager } from "./websocket.manager.js";
import { DocumentRepository } from "../modules/document/document.repository.js";

export async function handleMessage(

	socket: WebSocket,
	raw: Buffer,
	repository: DocumentRepository

) {

	const message = JSON.parse(

		raw.toString()

	) as ClientMessage;


	switch (message.type) {

		case "join":

			const document = await repository.findById(message.documentId);
			if (!document) {
				socket.send(
					JSON.stringify({
						type: "error",
						message: "Document not found",
					})
				);
				return;
			}

			documentManager.join(

				message.documentId,

				socket

			);

			socket.send(
				JSON.stringify({
					type: "init",
					document: document.content,
				})
			);

			break;

		case "operations":

			documentManager.broadcast(

				message.documentId,

				socket,

				message

			);

			break;

	}

}
