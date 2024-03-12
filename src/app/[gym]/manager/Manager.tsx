'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import usePassList from '@/services/usePassList';

import 'react-datepicker/dist/react-datepicker.css';

const Manager = () => {
	const { gym } = useParams();
	const [selectedDate, setSelectedDate] = useState(new Date());

	const [selectedPassType, setSelectedPassType] = useState<'all' | 'DayPass' | 'DayExperience'>(
		'all'
	);

	const { data } = usePassList(dayjs(selectedDate).format('YYYY/MM/DD'), selectedPassType);

	const handleChange = (event: any) => {
		setSelectedPassType(event.target.value);
	};
	return (
		<div className="w-full max-w-5xl mx-auto">
			<div className="inline-block min-w-full align-middle">
				<div className="h-[100px] flex justify-between items-center px-2 bg-stone-200">
					<div className="flex flex-col gap-1">
						<h2 className="font-bold text-[22px] h-[35px] flex items-center">
							{data?.gymName}
						</h2>
						<h3 className="text-[20px]">일일 이용/체험 현황</h3>
					</div>
					<div className="flex items-center gap-3">
						<select
							id="passType"
							className="bg-gray-50 border border-gray-500 text-gray-900 text-[14px] w-[100px] rounded-lg px-2 py-1"
							onChange={handleChange}
						>
							<option selected value="all">
								패스 유형
							</option>
							<option value="DayPass">일일이용</option>
							<option value="DayExperience">일일체험</option>
						</select>

						<div className="h-[50px] flex items-center px-2">
							<label htmlFor="passDate" className="mr-[6px]">
								날짜
							</label>
							<DatePicker
								selected={selectedDate}
								onChange={(date) => setSelectedDate(date as Date)}
								dateFormat="yyyy/MM/dd"
								customInput={
									<input
										id="passDate"
										className="text-[14px] w-[100px] rounded-lg px-2 py-1 border-gray-500"
									/>
								}
							/>
						</div>
					</div>
				</div>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
							<th scope="col" className="px-6 py-3 whitespace-nowrap">
								<span className="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.passList.map(
							({ id, name, phoneNumber, dateOfBirth, type, createdAt }: any) => (
								<tr key={id} className="bg-white border-b hover:bg-gray-50">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
									>
										{name}
									</th>
									<td className="px-6 py-4 whitespace-nowrap">{phoneNumber}</td>
									<td className="px-6 py-4 whitespace-nowrap">{dateOfBirth}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{dayjs(createdAt).format('HH시 mm분 ss초')}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">{type}</td>
									<td className="px-6 py-4 whitespace-nowrap text-right">
										<Link
											href={`/${gym}/manager/passDetail?id=${id}`}
											className="font-medium text-blue-600 hover:underline"
										>
											자세히
										</Link>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Manager;
