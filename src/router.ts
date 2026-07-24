import FastifyInstance from "fastify";
import { AuthRoutes } from "./modules/auth/auth.routes.js";
import { DocumentRoutes } from "./modules/document/document.routes.js";
import websocketRoutes from "./modules/ws/websocket.routes.js";


export default async function routes(app: FastifyInstance) {
	app.register(AuthRoutes, {
		prefix: "/api",
	});
	app.register(DocumentRoutes, {
		prefix: "/api/documents",
	});
	app.register(websocketRoutes, {
		prefix: "/",
	});
}

