'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import Spinner from '@/components/Spinner';
import useMyGymList from '@/services/useMyGymList';

const Skeleton = () => (
	<ul className="flex flex-col gap-2 blur">
		<li className="flex items-center border-b pb-2">
			<h3 className="font-bold w-[160px] mr-2">1호점</h3>
			<div className="bg-[#7F8487] text-white rounded-md py-2 px-3 mr-2 text-[14px]">
				패스
			</div>
			<div className="bg-[#413F42] text-white rounded-md py-2 px-3 text-[14px]">관리</div>
		</li>
		<li className="flex items-center">
			<h3 className="font-bold w-[160px] mr-2">2호점</h3>
			<div className="bg-[#7F8487] text-white rounded-md py-2 px-3 mr-2 text-[14px]">
				패스
			</div>
			<div className="bg-[#413F42] text-white rounded-md py-2 px-3 text-[14px]">관리</div>
		</li>
	</ul>
);

const Home = () => {
	const { status } = useSession();
	const isAuthLoading = status === 'loading';
	const isLogin = status === 'authenticated';

	const { isLoading: isGymListLoading, data } = useMyGymList();

	const isLoading = isAuthLoading || isGymListLoading;

	return (
		<section className="px-2">
			<h3 className="text-[20px] mb-4 font-bold ml-2">나의 지점 리스트</h3>
			<div className="border border-black p-5 rounded-md min-w-[250px]">
				{isLoading ? (
					<div className="relative">
						<Skeleton />
						<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
							<Spinner />
						</div>
					</div>
				) : !isLogin ? (
					<div className="relative">
						<Skeleton />
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<Link
								href="/login"
								className="w-full justify-center border rounded-md border-black bg-stone-300/60 flex px-6 py-2 gap-1"
							>
								<h4 className="whitespace-nowrap">로그인이 필요해요</h4>
								<Image src="icons/ic_lock.svg" width={24} height={24} alt="" />
							</Link>
						</div>
					</div>
				) : data.length > 0 ? (
					<ul className="flex flex-col gap-2">
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
						<Skeleton />
						<div className="absolute text-center w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<p>소유한 암장 리스트가 없습니다.</p>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default Home;
