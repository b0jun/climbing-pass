'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useOverlay } from '@toss/use-overlay';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import * as yup from 'yup';

import BottomSheet from '../BottomSheet';
import Button from '../Button';
import Signature from '../Signature';
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
		name: yup.string().required('이름을 입력해주세요.'),
		phoneNumber: yup
			.string()
			.required('휴대폰 번호를 입력해주세요.')
			.min(10, '휴대폰 번호를 정확히 입력해주세요.'),
		dateOfBirth: yup
			.string()
			.required('생년월일을 입력해주세요.')
			.matches(/^[0-9/]{10}$/, '생년월일을 정확히 입력해주세요.'),
		consent: yup.boolean().oneOf([true]).required(),
	};
	const resolver = yupResolver(yup.object().shape(validations));
	return { defaultValues, resolver };
};

const ConsentForm = () => {
	const t = useTranslations('Consent');

	const methods = useForm<FormData>({ ...formInit(), mode: 'onBlur' });
	const {
		control,
		setValue,
		handleSubmit,
		formState: { isValid },
	} = methods;
	const { replace } = useRouter();
	const { gym } = useParams();

	const overlay = useOverlay();
	const openSignBottomSheet = () => {
		return new Promise<boolean>((resolve) => {
			overlay.open(({ isOpen, close, exit }) => (
				<BottomSheet
					title={t('signatureTitle')}
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
		const isSign = await openSignBottomSheet();
		if (!isSign) {
			return;
		}
		// TODO: Submit
		replace(`/${gym}/complete`);
	};

	return (
		<FormProvider {...methods}>
			<div className="px-5 mt-5">
				<h1 className="mt-4 mb-6 text-xl font-bold text-center">{t('title')}</h1>
				<form className="flex flex-col w-full gap-6" onSubmit={handleSubmit(onSubmit)}>
					<TextInput name="name" label={t('name')} maxLength={20} />
					<TextInput
						name="phoneNumber"
						label={t('phoneNumber')}
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
						<h4 className="mb-2 text-sm font-bold text-gray-500">{t('consent')}</h4>
						<div className="p-4 text-gray-500 whitespace-pre-wrap border-t-2 border-gray-300 rounded-t-md border-x-2 bg-slate-100">
							{t('consentDesc')}
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
									{t('consentCheckbox')}
								</label>
							</div>
						</div>
					</div>
					<Button type="submit" label={t('nextButton')} disabled={!isValid} />
				</form>
			</div>
		</FormProvider>
	);
};

export default ConsentForm;
