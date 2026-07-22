import fp from "fastify-plugin";


export default fp(async (fastify) => {

	fastify.decorate(
		"authenticate",
		async function(
			request,
			reply
		) {

			try {

				const ans = await request.jwtVerify();
				console.log(ans);

			} catch (err) {

				return reply
					.code(401)
					.send({
						message: "Unauthorized"
					});
			}

		}
	);

});
