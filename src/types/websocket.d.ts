import { WebSocket } from "ws";

export interface Client {

	id: string;

	socket: WebSocket;

	documentId?: string;

}
