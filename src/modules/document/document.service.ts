import {
	DocumentRepository
} from "./document.repository";

import {
	CreateDocumentInput
} from "./document.schema";


export class DocumentService {


	constructor(
		private documents: DocumentRepository
	) { }



	async create(
		data: CreateDocumentInput,
		userId: string
	) {

		return this.documents.create({
			title: data.title,
			ownerId: userId
		});
	}



	async delete(
		documentId: string,
		userId: string
	) {

		const document =
			await this.documents.belongsToUser(
				documentId,
				userId
			);


		if (!document) {
			throw new Error(
				"Document not found"
			);
		}


		return this.documents.delete(
			documentId
		);
	}
}
