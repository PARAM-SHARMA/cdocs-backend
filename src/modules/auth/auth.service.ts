import bcrypt from "bcrypt";
import { UserRepository } from "../user/user.repository";
import { LoginInput, RegisterInput } from "./auth.schema";


export class AuthService {

	constructor(
		private users: UserRepository
	) { }


	async register(data: RegisterInput) {

		const existing =
			await this.users.findByEmail(data.email);


		if (existing) {
			throw new Error(
				"Registration failed"
			);
		}


		const passwordHash =
			await bcrypt.hash(
				data.password,
				12
			);


		const user =
			await this.users.create({
				email: data.email,
				username: data.username,
				passwordHash
			});


		return this.safeUser(user);
	}



	async login(data: LoginInput) {

		const user =
			await this.users.findByEmail(
				data.email
			);


		/*
		  Same error message whether:
		  - email does not exist
		  - password is wrong

		  Prevents account enumeration
		*/

		if (!user) {
			throw new Error(
				"Invalid credentials"
			);
		}


		const passwordValid =
			await bcrypt.compare(
				data.password,
				user.passwordHash
			);


		if (!passwordValid) {
			throw new Error(
				"Invalid credentials"
			);
		}


		return this.safeUser(user);
	}



	private safeUser(user: any) {

		return {
			id: user.id,
			email: user.email,
			username: user.username,
			createdAt: user.createdAt
		};
	}
}
