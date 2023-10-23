'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';
import * as yup from 'yup';

import Header from '@/components/Header';

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

const Register = () => {
	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');
	const pass = searchParams.get('pass');
	const signCanvas = useRef() as React.MutableRefObject<any>;

	const methods = useForm<FormData>(formInit());
	const { register } = methods;
	return (
		<FormProvider {...methods}>
			<main className="flex flex-col items-center justify-center py-10">
				<Header type="register" />
				<div className="mt-4 mb-8 flex items-center gap-4">
					<div className="relative w-10 h-10">
						<Image src="/images/logo.png" alt="logo" fill />
					</div>
					<h1 className="text-2xl">브로스 클라이밍 일일이용 신청서</h1>
				</div>

				<div className="flex flex-col gap-5 px-10 w-full">
					<div className="flex flex-col w-full">
						<label htmlFor="name" className="text-base mb-1 font-medium">
							이름
						</label>
						<input
							{...register('name')}
							className="bg-slate-100 rounded-md h-12 px-4 text-base border-solid border border-black focus:outline outline-black"
							placeholder="이름을 입력해주세요"
							id="name"
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="phoneNumber" className="text-base mb-1 font-medium">
							휴대폰 번호
						</label>
						<input
							{...register('phoneNumber')}
							className="bg-slate-100 rounded-md h-12 px-4 text-base border-solid border border-black focus:outline outline-black"
							placeholder="휴대폰 번호를 입력해주세요"
							id="phoneNumber"
						/>
					</div>
					<div className="bg-gray-200 p-4 rounded-md">
						1) 브로스 클라이밍 시설을 이용함에 있어 부주의.... 브로스 클라이밍 시설을
						이용함에 있어 부주의....브로스 클라이밍 시설을 이용함에 있어 부주의....
						브로스 클라이밍 시설을 이용함에 있어 부주의....
						<br />
						2) 브로스 클라이밍 시설을 이용함에 있어 부주의.... 브로스 클라이밍 시설을
						이용함에 있어 부주의....브로스 클라이밍 시설을 이용함에 있어 부주의....
						브로스 클라이밍 시설을 이용함에 있어 부주의....
					</div>
					<div className="w-10 rounded-sm">
						<h4 className="text-base mb-1 font-medium">서명</h4>
						<div className="flex justify-center items-center w-[304px] h-[204px] border-2 border-black rounded-sm">
							<SignatureCanvas // canvas element
								ref={signCanvas}
								canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }}
								backgroundColor="rgb(235, 235, 235)"
							/>
						</div>
					</div>
					<button
						type="button"
						className="bg-blue-500 text-white font-medium h-12 rounded-md my-6"
					>
						작성 완료
					</button>
				</div>
			</main>
		</FormProvider>
	);
};

export default Register;