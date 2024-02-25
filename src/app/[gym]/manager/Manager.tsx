'use client';

import dayjs from 'dayjs';

import usePassList from '@/services/usePassList';

const Manager = () => {
	const { data } = usePassList();
	return (
		<div>
			<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
				<div className="h-[60px] flex items-center">
					<h3 className="text-[20px]">
						<span className="font-bold text-[22px]">{data?.gymName}</span> 일일이용자
						현황
					</h3>
				</div>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								이름
							</th>
							<th scope="col" className="px-6 py-3">
								전화번호
							</th>
							<th scope="col" className="px-6 py-3">
								생년월일
							</th>
							<th scope="col" className="px-6 py-3">
								입장 등록시간
							</th>
							<th scope="col" className="px-6 py-3">
								패스 유형
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.passList.map(
							({ id, name, phoneNumber, dateOfBirth, type, createdAt }: any) => (
								<tr
									key={id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{name}
									</th>
									<td className="px-6 py-4">{phoneNumber}</td>
									<td className="px-6 py-4">{dateOfBirth}</td>
									<td className="px-6 py-4">
										{dayjs(createdAt).format('HH시 mm분 ss초')}
									</td>
									<td className="px-6 py-4">{type}</td>
									<td className="px-6 py-4 text-right">
										<a
											href="#"
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										>
											자세히
										</a>
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
