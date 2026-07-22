import Fastify from "fastify";
import cors from "@fastify/cors";
import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";
import routes from "./router.js";
import authenticatePlugin from "./plugins/authenticate.js";

const app = Fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				colorize: true,
				translateTime: "HH:MM:ss",
				ignore: "pid,hostname",
			},
		},
	},
});

await app.register(cors, {
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	credentials: true,
});

await app.register(jwtPlugin)
await app.register(prismaPlugin);
await app.register(authenticatePlugin);
await app.register(routes);

const start = async () => {
	try {
		await app.listen({
			port: 4000,
			host: "0.0.0.0",
		});

		console.log("Server running on http://localhost:3000");
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
