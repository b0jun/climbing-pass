'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';
import * as yup from 'yup';

import Header from '@/components/Header';

type Props = {
	params: {
		type: string;
	};
};

type FormData = {
	name: string;
	phoneNumber: string;
};

const formInit = () => {
	const defaultValues = async (): Promise<FormData> => ({
		name: '',
		phoneNumber: '',
	});
	const validations = {
		name: yup.string().required(),
		phoneNumber: yup.string().required(),
	};
	const resolver = yupResolver(yup.object().shape(validations));
	return { defaultValues, resolver };
};

const Consent = ({ params: { type } }: Props) => {
	const signCanvas = useRef() as React.MutableRefObject<any>;

	const methods = useForm<FormData>(formInit());
	const { register } = methods;

	return (
		<FormProvider {...methods}>
			<main className="flex flex-col items-center justify-center">
				<Header hasBack />
				<div className="flex items-center gap-4 mt-4 mb-8">
					<div className="relative w-10 h-10">
						<Image src="/images/logo.png" alt="logo" fill />
					</div>
					<h1 className="text-2xl">브로스 클라이밍 일일이용 신청서</h1>
				</div>

				<div className="flex flex-col w-full gap-5 px-5">
					<div className="flex flex-col w-full">
						<label htmlFor="name" className="mb-1 text-base font-medium">
							이름
						</label>
						<input
							{...register('name')}
							className="h-12 px-4 text-base border border-black border-solid rounded-md bg-slate-100 focus:outline outline-black"
							placeholder="이름을 입력해주세요"
							id="name"
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="phoneNumber" className="mb-1 text-base font-medium">
							휴대폰 번호
						</label>
						<input
							{...register('phoneNumber')}
							className="h-12 px-4 text-base border border-black border-solid rounded-md bg-slate-100 focus:outline outline-black"
							placeholder="휴대폰 번호를 입력해주세요"
							id="phoneNumber"
						/>
					</div>
					<div className="p-4 bg-gray-200 rounded-md">
						1) 브로스 클라이밍 시설을 이용함에 있어 부주의.... 브로스 클라이밍 시설을
						이용함에 있어 부주의....브로스 클라이밍 시설을 이용함에 있어 부주의....
						브로스 클라이밍 시설을 이용함에 있어 부주의....
						<br />
						2) 브로스 클라이밍 시설을 이용함에 있어 부주의.... 브로스 클라이밍 시설을
						이용함에 있어 부주의....브로스 클라이밍 시설을 이용함에 있어 부주의....
						브로스 클라이밍 시설을 이용함에 있어 부주의....
					</div>
					<div className="w-10 rounded-sm">
						<h4 className="mb-1 text-base font-medium">서명</h4>
						<div className="flex justify-center items-center w-[204px] h-[114px] border-2 border-black rounded-sm">
							<SignatureCanvas // canvas element
								ref={signCanvas}
								canvasProps={{ width: 200, height: 110, className: 'sigCanvas' }}
								backgroundColor="rgb(235, 235, 235)"
							/>
						</div>
					</div>
					<button
						type="button"
						className="h-12 my-6 font-medium text-white bg-blue-500 rounded-md"
					>
						작성 완료
					</button>
				</div>
			</main>
		</FormProvider>
	);
};

export default Consent;
