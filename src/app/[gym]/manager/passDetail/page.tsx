'use client';

import dayjs from 'dayjs';
import Image from 'next/image';

import Spinner from '@/components/Spinner';
import usePassDetail from '@/services/usePassDetail';

const PassDetailPage = () => {
	const { isLoading, data } = usePassDetail();
	console.log('data', data);
	if (isLoading) {
		return <Spinner />;
	}

	if (!isLoading && !data) {
		return <div>데이터가 없습니다.</div>;
	}

	return (
		<div className="w-full max-w-5xl mx-auto">
			<header className="h-[60px] flex items-center justify-center text-center text-2xl">
				<h1>돌멩이클라이밍 이용동의서</h1>
			</header>
			<div className="flex gap-4">
				<p>성명</p>
				<p>{data.passDetail.name}</p>
			</div>
			<div className="flex gap-4">
				<p>전화번호</p>
				<p>{data.passDetail.phoneNumber}</p>
			</div>
			<div className="flex gap-4">
				<p>생년월일</p>
				<p>{data.passDetail.dateOfBirth}</p>
			</div>
			<div className="flex gap-4">
				<p>패스유형</p>
				<p>{data.passDetail.type === 'day pass' ? '일일이용' : '일일체험'}</p>
			</div>
			<div className="flex gap-4">
				<p>입장 등록시간</p>
				<p>{dayjs(data.passDetail.createdAt).format('HH시 mm분 ss초')}</p>
			</div>
			<div className="">
				<Image src={data.passDetail.signature} alt="" width={300} height={180} />
			</div>
		</div>
	);
};

export default PassDetailPage;
