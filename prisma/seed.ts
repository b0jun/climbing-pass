import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	const salt = await bcrypt.genSalt();

	const response = await Promise.all([
		prisma.user.upsert({
			where: {
				identifier: 'hmhs15',
			},
			update: {},
			create: {
				identifier: 'hmhs15',
				password: await bcrypt.hash('dol20132635', salt),
				name: 'Dolmenge',
				email: 'hmhs15@naver.com',
			},
		}),
		prisma.gym.upsert({
			where: {
				domain: 'dolmenge_jeonpo',
			},
			update: {},
			create: {
				name: '돌멩이 클라이밍',
				enName: 'dolmenge climbing jenpo',
				domain: 'dolmenge_jeonpo',
			},
		}),
	]);
	console.log(response);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
