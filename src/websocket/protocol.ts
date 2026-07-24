export type ClientMessage =

	| {

		type: "join";

		documentId: string;

	}

	| {

		type: "operations";

		documentId: string;

		operations: unknown[];

	};



export type ServerMessage =

	| {

		type: "document_state";

		snapshot: unknown;

	}

	| {

		type: "operations";

		operations: unknown[];

	};
