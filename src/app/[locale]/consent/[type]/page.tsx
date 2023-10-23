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
	console.log(signCanvas);
	return (
		<main className="flex flex-col justify-center h-full">
			<FormProvider {...methods}>
				<Header hasBack />
				<div className="px-5">
					<Image src="/images/text_logo.png" width={120} height={32} alt="text_logo" />
					<h1 className="mt-4 mb-6 text-2xl font-bold text-center">
						브로스클라이밍 일일 이용 동의서
					</h1>
					<div className="flex flex-col w-full gap-5">
						<div className="flex flex-col w-full">
							<label htmlFor="name" className="mb-1 text-base font-bold">
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
							<label htmlFor="phoneNumber" className="mb-1 text-base font-bold">
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
							1) 브로스 클라이밍 시설을 이용함에 있어 부주의.... 브로스 클라이밍
							시설을 이용함에 있어 부주의....브로스 클라이밍 시설을 이용함에 있어
							부주의.... 브로스 클라이밍 시설을 이용함에 있어 부주의....
							<br />
							2) 브로스 클라이밍 시설을 이용함에 있어 부주의.... 브로스 클라이밍
							시설을 이용함에 있어 부주의....브로스 클라이밍 시설을 이용함에 있어
							부주의.... 브로스 클라이밍 시설을 이용함에 있어 부주의....
						</div>
						<div className="p-4 bg-gray-200 rounded-md">
							1) 브로스 클라이밍 시설을 이용함에 있어 부주의.... 브로스 클라이밍
							시설을 이용함에 있어 부주의....브로스 클라이밍 시설을 이용함에 있어
							부주의.... 브로스 클라이밍 시설을 이용함에 있어 부주의....
							<br />
							2) 브로스 클라이밍 시설을 이용함에 있어 부주의.... 브로스 클라이밍
							시설을 이용함에 있어 부주의....브로스 클라이밍 시설을 이용함에 있어
							부주의.... 브로스 클라이밍 시설을 이용함에 있어 부주의....
						</div>
						<div className="w-10 rounded-sm">
							<h4 className="mb-1 text-base font-bold">서명</h4>
							<div className="relative w-[204px] h-[114px] bg-black">
								<div className="flex items-center justify-center w-full h-full border-2 border-black rounded-sm">
									<SignatureCanvas // canvas element
										ref={signCanvas}
										canvasProps={{
											width: 200,
											height: 110,
											className: 'sigCanvas',
										}}
										backgroundColor="rgb(235, 235, 235)"
									/>
								</div>
								<button
									type="button"
									onClick={() => signCanvas.current.clear()}
									className="absolute right-0 flex items-center justify-center mt-2 border border-black w-7 h-7 bg-slate-200"
								>
									<Image
										src="/icons/ic_eraser.svg"
										width={20}
										height={20}
										alt="eraser"
									/>
								</button>
							</div>
						</div>
						<button
							type="button"
							className="h-12 mt-12 mb-6 font-bold text-white bg-blue-500 rounded-md"
						>
							작성 완료
						</button>
					</div>
				</div>
			</FormProvider>
		</main>
	);
};

export default Consent;
