import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const response = await Promise.all([
		prisma.user.upsert({
			where: {
				identifier: 'hmhs13',
			},
			update: {},
			create: {
				identifier: 'hmhs13',
				password: 'ckd2013',
				name: 'Dolmenge',
				email: 'bjkim0228@naver.com',
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
