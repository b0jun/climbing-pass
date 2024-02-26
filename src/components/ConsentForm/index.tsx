'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useOverlay } from '@toss/use-overlay';
import { upload } from '@vercel/blob/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import * as yup from 'yup';

import useCreatePass from '@/services/useCreatePass';

import BottomSheet from '../BottomSheet';
import Button from '../Button';
import Signature from '../Signature';
import Spinner from '../Spinner';
import TextInput from '../TextInput';
import TextInputBirth from '../TextInputBirth';

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
		name: yup
			.string()
			.required('이름을 입력해주세요.')
			.matches(/^[가-힣a-zA-Z]/, '유효하지 않은 이름 형식 입니다.')
			.max(30, '이름이 너무 길어요.'),
		phoneNumber: yup
			.string()
			.required('휴대폰 번호를 입력해주세요.')
			.min(10, '휴대폰 번호를 정확히 입력해주세요.'),
		dateOfBirth: yup
			.string()
			.required('생년월일을 입력해주세요.')
			.matches(
				/^(19\d{2}|20\d{2}|2100)\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
				'유효하지 않은 생년월일 형식 입니다.'
			),
		consent: yup.boolean().oneOf([true]).required(),
	};
	const resolver = yupResolver(yup.object().shape(validations));
	return { defaultValues, resolver };
};

const ConsentForm = () => {
	const methods = useForm<FormData>({ ...formInit(), mode: 'onBlur' });
	const {
		control,
		setValue,
		handleSubmit,
		formState: { isValid },
	} = methods;
	const { gym, type } = useParams();
	const [isImageUploading, setIsImageUploading] = useState(false);
	const { mutate, isPending } = useCreatePass();

	const isSubmitting = isPending || isImageUploading;
	const overlay = useOverlay();
	const passType = type === 'day-pass' ? '이용' : '체험';
	const openSignBottomSheet = () => {
		return new Promise<string | boolean>((resolve) => {
			overlay.open(({ isOpen, close, exit }) => (
				<BottomSheet
					title={`돌멩이 클라이밍 일일${passType} 동의서`}
					open={isOpen}
					onClose={() => {
						close();
						setTimeout(() => {
							resolve(false);
							exit();
						}, 200);
					}}
				>
					<Signature
						onConfirm={(value: any) => {
							close();
							setTimeout(() => {
								resolve(value);
								exit();
							}, 200);
						}}
					/>
				</BottomSheet>
			));
		});
	};

	const onSubmit = async (data: FormData) => {
		const signData = await openSignBottomSheet();
		if (!signData) {
			return;
		}
		setIsImageUploading(true);
		const fileName = `${data.name}.png`;
		const decodedURL = (signData as string).replace(/^data:image\/\w+;base64,/, '');
		const buf = Buffer.from(decodedURL, 'base64');
		const blob = new Blob([buf], { type: 'image/png' });

		const { url } = await upload(
			`signature/${fileName}`,
			new File([blob], fileName, { type: 'image/png' }),
			{
				access: 'public',
				handleUploadUrl: '/api/pass/upload',
			}
		);

		const { consent, ...withoutConsent } = data;
		const body = { ...withoutConsent, type, gym, signature: url };

		mutate(body);
		setIsImageUploading(false);
	};

	return (
		<FormProvider {...methods}>
			<div className="px-5 mt-5">
				<h1 className="mt-4 mb-6 text-xl font-bold text-center">
					{`돌멩이 클라이밍 일일${passType} 동의서`}
				</h1>
				<form className="flex flex-col w-full gap-6" onSubmit={handleSubmit(onSubmit)}>
					<TextInput name="name" label="이름" maxLength={20} />
					<TextInput
						name="phoneNumber"
						label="휴대폰 번호"
						placeholder="- 없이 숫자만 입력"
						onChange={(e) =>
							setValue('phoneNumber', e.target.value.replace(/[^0-9]/g, ''))
						}
						maxLength={11}
						inputMode="numeric"
					/>
					<Controller
						control={control}
						name="dateOfBirth"
						render={({ field }) => {
							const { ref, ...rest } = field;
							return (
								<PatternFormat
									{...rest}
									customInput={TextInputBirth}
									format="####/##/##"
									mask={'_'}
								/>
							);
						}}
					/>
					<div>
						<h4 className="mb-2 text-sm font-bold text-gray-500">
							실내 클라이밍 위험 고지
						</h4>
						<div className="p-4 text-gray-500 whitespace-pre-wrap border-t-2 border-gray-300 rounded-t-md border-x-2 bg-slate-100">
							{`1) 돌멩이 클라이밍 시설과 등반활동 중 사고발생 가능성이 있으며, 이에 따른 상해의 위험이 따릅니다.\n- 위험 정보에 대해 인지하고 이해하고 있으며, 본인의 부주의 및 타인에 의한 상해와 손실에 물질적 손해에 책임을 묻지않을 것에 동의합니다.\n\n2) 돌멩이 클라이밍의 시설과 물품 파손시, 보상을 이행합니다.\n\n3) 초등 1학년(8세)부터 중등 3학년(16세)의 경우 부모님과 동행해야 이용이 가능하며, 부모님이 안전을 책임져야합니다.\n\n4) 데스크에 맡기지 않은 귀중품, 지갑, 전자기기 등의 분실 및 책임은 본인에게 있습니다.\n\n5) 위와 같은 행동으로 발생한 사고에 대해 돌멩이 클라이밍의 대표나 직원에게 법적 책임과 손해배상 책임을 묻지 않을것이며, 이후 돌멩이 클라이밍을 이용하는 동안에도 위의 약속은 유효합니다.`}
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
									모두 동의합니다.
								</label>
							</div>
						</div>
					</div>
					<Button type="submit" label="다음" disabled={!isValid || isSubmitting} />
				</form>
			</div>
			{isSubmitting && (
				<div className="fixed inset-0 flex items-center bg-black/50 justify-center">
					<Spinner />
				</div>
			)}
		</FormProvider>
	);
};

export default ConsentForm;
