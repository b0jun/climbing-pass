'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';
import * as yup from 'yup';

import TextInput from '../TextInput';
type Props = {
	title: string;
	name: string;
	phoneNumber: string;
	dateOfBirth: string;
	consent: string;
	consentDesc: string;
	signature: string;
	submitButton: string;
};

type FormData = {
	name: string;
	phoneNumber: string;
	dateOfBirth: string;
};

const formInit = () => {
	const defaultValues = async (): Promise<FormData> => ({
		name: '',
		phoneNumber: '',
		dateOfBirth: '',
	});
	const validations = {
		name: yup.string().required(),
		phoneNumber: yup.string().required(),
		dateOfBirth: yup.string().required(),
	};
	const resolver = yupResolver(yup.object().shape(validations));
	return { defaultValues, resolver };
};

const onSubmit = (data: FormData) => {
	alert(`name: ${data.name}\nphoneNumber:${data.phoneNumber}\ndateOfBirth:${data.dateOfBirth}`);
};

const ConsentForm = ({
	title,
	name,
	phoneNumber,
	dateOfBirth,
	consent,
	consentDesc,
	signature,
	submitButton,
}: Props) => {
	const methods = useForm<FormData>(formInit());
	const { handleSubmit } = methods;
	const signCanvas = useRef() as React.MutableRefObject<any>;
	const locale = useLocale();
	const isKo = locale === 'ko';

	return (
		<FormProvider {...methods}>
			<div className="px-5 mt-5">
				<h1 className="mt-4 mb-6 text-xl font-bold text-center">{title}</h1>
				<div className="flex flex-col w-full gap-6">
					<TextInput id="name" label={name} />
					<TextInput id="phoneNumber" label={phoneNumber} />
					<TextInput id="dateOfBirth" label={dateOfBirth} />
					<div>
						<h4 className="mb-1 text-sm font-bold text-gray-500">{consent}</h4>
						<div className="p-4 text-gray-500 whitespace-pre-wrap border-2 border-gray-300 rounded-md bg-slate-100">
							{consentDesc}
						</div>
					</div>
					<div className="w-10 mb-10 rounded-sm">
						<h4 className="mb-1 text-sm font-bold text-gray-500">{signature}</h4>
						<div className="relative w-[204px] h-[114px] bg-slate-100">
							<div className="flex items-center justify-center w-full h-full border-2 border-gray-300 rounded-sm">
								<SignatureCanvas
									ref={signCanvas}
									canvasProps={{
										width: 200,
										height: 110,
										className: 'sigCanvas',
									}}
									backgroundColor="rgb(241, 245, 249)"
								/>
							</div>
							<button
								type="button"
								onClick={() => signCanvas.current.clear()}
								className="absolute top-0 flex items-center justify-center border-2 border-gray-300 rounded-sm -right-[26px] w-7 h-7 bg-slate-100"
							>
								<Image
									src="/icons/ic_delete.svg"
									width={24}
									height={24}
									alt="eraser"
								/>
							</button>
							<p className="text-sm text-right text-gray-500">
								{dayjs().format(isKo ? 'YYYY년 MM월 DD일' : 'MMM DD, YYYY')}
							</p>
							<p className="absolute text-2xl font-bold text-black -translate-x-1/2 -translate-y-1/2 opacity-10 top-1/2 left-1/2">
								{signature}
							</p>
						</div>
					</div>
					<button
						type="button"
						className="h-12 my-6 font-bold text-white rounded-md bg-main"
						onClick={handleSubmit(onSubmit)}
					>
						{submitButton}
					</button>
				</div>
			</div>
		</FormProvider>
	);
};

//'YYYY[년] MM[월] DD[일]'
export default ConsentForm;
