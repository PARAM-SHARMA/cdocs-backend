import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default fp(async (fastify) => {
	try {
		await prisma.$connect();

		await prisma.$queryRaw`SELECT 1`;

		fastify.log.info("✅ MySQL connected");

		fastify.decorate("prisma", prisma);

		fastify.addHook("onClose", async () => {
			await prisma.$disconnect();
			fastify.log.info("🔌 MySQL disconnected");
		});
	} catch (error) {
		fastify.log.error(error, "❌ MySQL connection failed");
		throw error;
	}
});

declare module "fastify" {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}
