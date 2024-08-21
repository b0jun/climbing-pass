export class CustomError extends Error {
	constructor(public message: string, public status: number) {
		super(message);
		this.status = status;
		Object.setPrototypeOf(this, CustomError.prototype);
	}
}
