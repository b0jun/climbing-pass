import jwt, { JwtPayload } from 'jsonwebtoken';

import { CustomError } from './CustomError';

interface SignOption {
	expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
	expiresIn: '15d',
};

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
	const secret_key = process.env.JWT_SECRET;
	const token = jwt.sign(payload, secret_key!, options);
	return token;
}

export function verifyJwt(token: string) {
	try {
		const secret_key = process.env.JWT_SECRET;
		const decoded = jwt.verify(token, secret_key!);
		return decoded as JwtPayload;
	} catch (e: any) {
		const error = new CustomError(e.name);
		error.code = 401;
		throw error;
	}
}
