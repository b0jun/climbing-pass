'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import Spinner from '@/components/Spinner';
import useMyGymList from '@/services/useMyGymList';

const GYM_DUMMY = [
	{
		id: 1,
		name: '1호점',
		domain: 'one',
	},
	{
		id: 2,
		name: '아주 아주 긴이름을 가진 지점',
		domain: 'two',
	},
	{
		id: 3,
		name: '돌멩이 클라이밍 전포점',
		domain: 'three',
	},
];

const Home = () => {
	const { status } = useSession();
	const isAuthLoading = status === 'loading';
	const isLogin = status === 'authenticated';

	const { isLoading, data } = useMyGymList();
	return (
		<section className="px-2">
			<h3 className="text-[20px] mb-4 font-bold ml-2">나의 지점 리스트</h3>
			<div className="border border-black p-5 rounded-md">
				{isLogin ? (
					<ul className="flex flex-col gap-2 min-w-[250px]">
						{data?.map(({ id, name, domain }: any) => (
							<li
								key={id}
								className="flex items-center border-b pb-2 last:border-0 last:pb-0"
							>
								<h3 className="font-bold w-[160px] mr-2">{name}</h3>
								<Link
									href={`/${domain}/pass`}
									className="bg-[#7F8487] text-white rounded-md py-2 px-3 mr-2 text-[14px]"
								>
									패스
								</Link>
								<Link
									href={`/${domain}/manager`}
									className="bg-[#413F42] text-white rounded-md py-2 px-3 text-[14px]"
								>
									관리
								</Link>
							</li>
						))}
					</ul>
				) : (
					<div className="relative">
						<ul className="flex flex-col gap-2 blur">
							<li className="flex items-center border-b pb-2">
								<h3 className="font-bold w-[160px] mr-2">1호점</h3>
								<div className="bg-[#7F8487] text-white rounded-md py-2 px-3 mr-2 text-[14px]">
									패스
								</div>
								<div className="bg-[#413F42] text-white rounded-md py-2 px-3 text-[14px]">
									관리
								</div>
							</li>
							<li className="flex items-center">
								<h3 className="font-bold w-[160px] mr-2">2호점</h3>
								<div className="bg-[#7F8487] text-white rounded-md py-2 px-3 mr-2 text-[14px]">
									패스
								</div>
								<div className="bg-[#413F42] text-white rounded-md py-2 px-3 text-[14px]">
									관리
								</div>
							</li>
						</ul>
						{!isAuthLoading && (
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
								<Link
									href="/login"
									className="w-full justify-center border rounded-md border-black bg-stone-300/60 flex px-6 py-2 gap-1"
								>
									<h4 className="whitespace-nowrap">로그인이 필요해요</h4>
									<Image src="icons/ic_lock.svg" width={24} height={24} alt="" />
								</Link>
							</div>
						)}
					</div>
				)}
			</div>
			{(isLoading || isAuthLoading) && (
				<div className="absolute inset-0 flex items-center bg-black/50 justify-center">
					<Spinner />
				</div>
			)}
		</section>
	);
};

export default Home;