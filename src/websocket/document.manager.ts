import { WebSocket } from "ws";

export interface Room {

	sockets: Set<WebSocket>;

}

export class DocumentManager {

	private rooms = new Map<string, Room>();


	join(documentId: string, socket: WebSocket) {

		let room = this.rooms.get(documentId);

		if (!room) {

			room = {

				sockets: new Set(),

			};

			this.rooms.set(documentId, room);

		}

		room.sockets.add(socket);

	}


	leave(documentId: string, socket: WebSocket) {

		const room = this.rooms.get(documentId);

		if (!room) return;

		room.sockets.delete(socket);

		if (room.sockets.size === 0) {

			this.rooms.delete(documentId);

		}

	}


	broadcast(

		documentId: string,

		sender: WebSocket,

		payload: unknown

	) {

		const room = this.rooms.get(documentId);

		if (!room) return;

		const message = JSON.stringify(payload);

		for (const socket of room.sockets) {

			if (socket === sender) continue;

			socket.send(message);

		}

	}

}
