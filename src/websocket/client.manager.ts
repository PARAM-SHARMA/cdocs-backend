import { Client } from "../types/websocket.js";

export class ClientManager {

	private clients = new Map<string, Client>();

	add(client: Client) {

		this.clients.set(client.id, client);

	}

	remove(id: string) {

		this.clients.delete(id);

	}

	get(id: string) {

		return this.clients.get(id);

	}

}
