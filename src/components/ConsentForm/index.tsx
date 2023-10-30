'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
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
	consentCheckbox: string;
	signature: string;
	submitButton: string;
};

type FormData = {
	name: string;
	phoneNumber: string;
	dateOfBirth: string;
	consent: boolean;
};

const formInit = () => {
	const defaultValues = async (): Promise<FormData> => ({
		name: '',
		phoneNumber: '',
		dateOfBirth: '',
		consent: false,
	});
	const validations = {
		name: yup.string().required(),
		phoneNumber: yup.string().required(),
		dateOfBirth: yup.string().required(),
		consent: yup.boolean().oneOf([true]).required(),
	};
	const resolver = yupResolver(yup.object().shape(validations));
	return { defaultValues, resolver };
};

const ConsentForm = ({
	title,
	name,
	phoneNumber,
	dateOfBirth,
	consent,
	consentDesc,
	consentCheckbox,
	signature,
	submitButton,
}: Props) => {
	const methods = useForm<FormData>(formInit());
	const { handleSubmit } = methods;
	const router = useRouter();
	const signCanvas = useRef() as React.MutableRefObject<any>;
	const [isSignEdit, setIsSignEdit] = useState(false);

	const onSubmit = (data: FormData) => {
		alert(
			`name: ${data.name}\nphoneNumber:${data.phoneNumber}\ndateOfBirth:${data.dateOfBirth}`
		);
		router.push(`/complete`);
	};

	const startSignature = () => {
		setIsSignEdit(true);
	};

	const clearSign = () => {
		setIsSignEdit(false);
		signCanvas.current.clear();
	};

	return (
		<FormProvider {...methods}>
			<div className="px-5 mt-5">
				<h1 className="mt-4 mb-6 text-xl font-bold text-center">{title}</h1>
				<div className="flex flex-col w-full gap-6">
					<TextInput id="name" label={name} />
					<TextInput id="phoneNumber" label={phoneNumber} />
					<TextInput id="dateOfBirth" label={dateOfBirth} />
					<div>
						<h4 className="mb-2 text-sm font-bold text-gray-500">{consent}</h4>
						<div className="p-4 text-gray-500 whitespace-pre-wrap border-t-2 border-gray-300 rounded-t-md border-x-2 bg-slate-100">
							{consentDesc}
						</div>
						<div className="flex items-center px-4 border-2 border-gray-300 h-11 rounded-b-md bg-slate-100">
							<div className="flex items-center">
								<input
									{...methods.register('consent')}
									id="consent"
									type="checkbox"
									className="w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer text-main focus:ring-main focus:ring-2"
								/>
								<label
									htmlFor="consent"
									className="ml-2 text-base font-medium text-gray-500"
								>
									{consentCheckbox}
								</label>
							</div>
						</div>
					</div>
					<div className="w-10">
						<h4 className="mb-2 text-sm font-bold text-gray-500">{signature}</h4>
						<div className="relative w-[254px] h-[154px]">
							<div className="absolute z-20 flex items-center justify-center w-full h-full overflow-hidden border-2 border-gray-300 rounded-md bg-slate-100 opacity-90">
								<SignatureCanvas
									ref={signCanvas}
									canvasProps={{
										width: 250,
										height: 150,
										className: 'sigCanvas',
									}}
									onEnd={startSignature}
									backgroundColor="rgb(241, 245, 249)"
								/>
							</div>
							{isSignEdit && (
								<button
									type="button"
									onClick={clearSign}
									className="absolute z-50 flex items-center justify-center w-6 h-6 transition rounded-sm top-1 right-1 duration-2000"
								>
									<Image
										src="/icons/ic_delete.svg"
										width={24}
										height={24}
										alt="eraser"
									/>
								</button>
							)}
							<p className="absolute z-10 text-2xl font-bold text-black -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
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

export default ConsentForm;
