'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useRef } from 'react';
import DatePicker from 'react-datepicker';

import useQueryString from '@/hooks/useQueryString';
import usePassList from '@/services/usePassList';

import 'react-datepicker/dist/react-datepicker.css';

const Manager = () => {
	const datepickerRef = useRef<DatePicker>(null);
	const router = useRouter();
	const { gym } = useParams();
	const pathname = usePathname();
	const { createQueryString, deleteQueryString } = useQueryString();
	const { data, isPending, isFetched } = usePassList();
	// useEffect(() => {
	// 	if (!data && !isFetched) {
	// 		router.back();
	// 	}
	// }, [data, isFetched, router]);

	const today = dayjs().format('YYYY/MM/DD');
	const searchParams = useSearchParams();
	const passType = searchParams.get('passType');
	const passDate = searchParams.get('passDate') ?? today;

	const handleChangePassType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const passType = event.target.value;
		let queryString;
		if (!passType) {
			queryString = deleteQueryString('passType');
		} else {
			queryString = createQueryString('passType', passType);
		}
		router.replace(`${pathname}?${queryString}`);
	};

	const handleChangeDate = (date: Date) => {
		const queryString = createQueryString('passDate', dayjs(date).format('YYYY/MM/DD'));
		router.replace(`${pathname}?${queryString}`);
	};

	const setDateToToday = () => {
		const queryString = deleteQueryString('passDate');
		router.replace(`${pathname}?${queryString}`);
		datepickerRef.current?.setOpen(false);
	};

	return (
		<div className="w-full max-w-5xl mx-auto">
			<div className="inline-block min-w-full align-middle">
				<div className="h-[100px] flex justify-between items-center px-6 bg-stone-200">
					<div className="flex flex-col gap-1">
						<h2 className="font-bold text-[22px] h-[35px] flex items-center">{data?.gymName}</h2>
						<h3 className="text-[20px]">일일 패스 현황</h3>
					</div>
					<div className="flex items-center gap-3">
						{/* 패스유형 */}
						<select
							id="passType"
							className="bg-gray-50 border border-gray-500 text-gray-900 text-[14px] w-[100px] rounded-lg px-2 py-1"
							onChange={handleChangePassType}
							defaultValue={passType ?? ''}
						>
							<option value="">패스 유형</option>
							<option value="DayPass">일일이용</option>
							<option value="DayExperience">일일체험</option>
						</select>
						{/* 날짜 */}
						<div className="h-[50px] flex items-center">
							<DatePicker
								ref={datepickerRef}
								popperPlacement="bottom-start"
								selected={new Date(passDate)}
								onChange={handleChangeDate}
								dateFormat="yyyy/MM/dd"
								customInput={
									<input
										id="passDate"
										className="text-[14px] w-[100px] rounded-lg px-2 py-1 border-gray-500"
									/>
								}
							>
								<button
									type="button"
									onClick={setDateToToday}
									className="bg-emerald-500 text-white py-1 px-2 rounded-sm"
								>
									Today
								</button>
							</DatePicker>
						</div>
					</div>
				</div>
				{data?.passList?.length > 0 ? (
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 lg:table-fixed">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50">
							<tr>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									이름
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									전화번호
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									생년월일
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									입장 등록시간
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									패스 유형
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap text-right">
									<span className="sr-only">자세히</span>
									<span className="">총 이용자 수: {data.passList.length}명</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{data.passList.map(({ id, name, phoneNumber, dateOfBirth, type, createdAt }: any) => (
								<tr key={id} className="bg-white border-b hover:bg-gray-50">
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 truncate">
										{name}
									</th>
									<td className="px-6 py-4 whitespace-nowrap">{phoneNumber}</td>
									<td className="px-6 py-4 whitespace-nowrap">{dateOfBirth}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{dayjs(createdAt).format('A h시 mm분')}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">{type}</td>
									<td className="px-6 py-4 whitespace-nowrap text-right">
										<Link
											href={`/${gym}/manager/passDetail?id=${id}`}
											className="font-medium text-main hover:underline"
										>
											자세히
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					!isPending && <div className="py-[100px] text-center text-stone-700">등록된 패스가 없습니다.</div>
				)}
			</div>
		</div>
	);
};

export default Manager;
