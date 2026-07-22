import { PrismaClient } from "@prisma/client";


export class DocumentRepository {

	constructor(
		private prisma: PrismaClient
	) { }



	async create(data: {
		title?: string;
		ownerId: string;
	}) {

		return this.prisma.document.create({
			data: {
				title: data.title ?? "Untitled document",
				ownerId: data.ownerId,
			}
		});
	}



	async findById(id: string) {

		return this.prisma.document.findUnique({
			where: {
				id
			}
		});
	}



	async delete(id: string) {

		return this.prisma.document.delete({
			where: {
				id
			}
		});
	}



	async belongsToUser(
		documentId: string,
		userId: string
	) {

		return this.prisma.document.findFirst({
			where: {
				id: documentId,
				ownerId: userId
			}
		});
	}
}
