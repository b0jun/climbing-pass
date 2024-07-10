'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useOverlay } from '@toss/use-overlay';
import { upload } from '@vercel/blob/client';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { z } from 'zod';

import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import Signature from '@/components/Signature';
import Spinner from '@/components/Spinner';
import TextInput from '@/components/TextInput';
import TextInputBirth from '@/components/TextInputBirth';
import useCreatePass from '@/services/useCreatePass';
type FormData = {
	name: string;
	phoneNumber: string;
	dateOfBirth: string;
	shoesRental: boolean;
	consent: boolean;
};

const PassCreateSchema = (t: (key: string) => string) =>
	z.object({
		name: z
			.string()
			.min(1, t('nameMin'))
			.regex(/^[가-힣a-zA-Z]+$/, t('nameRegex'))
			.max(30, t('nameMax')),
		phoneNumber: z.string().min(1, t('phoneNumberMin')).min(10, t('phoneNumberRegex')),
		dateOfBirth: z
			.string()
			.min(1, t('dateOfBirthMin'))
			.regex(/^(19\d{2}|20\d{2}|2100)\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/, t('dateOfBirthRegex')),
		shoesRental: z.boolean().refine((val) => val !== undefined),
		consent: z.boolean().refine((val) => val === true),
	});

type PassCreateSchemaType = z.infer<ReturnType<typeof PassCreateSchema>>;

const ConsentForm = ({ gymData }: any) => {
	const t = useTranslations('Consent');
	const t2 = useTranslations('Pass');
	const methods = useForm<PassCreateSchemaType>({
		resolver: zodResolver(PassCreateSchema(t)),
		mode: 'onBlur',
		defaultValues: {
			name: '',
			phoneNumber: '',
			dateOfBirth: '',
			shoesRental: false,
			consent: false,
		},
	});
	const {
		control,
		setValue,
		handleSubmit,
		formState: { isValid },
	} = methods;
	const overlay = useOverlay();
	const { gym, type } = useParams();
	const locale = useLocale();
	const [isImageUploading, setIsImageUploading] = useState(false);
	const { mutate, isPending } = useCreatePass();
	const isSubmitting = isPending || isImageUploading;
	const isExperience = type === 'dayExperience';
	const passType = isExperience ? t2('dayExperience') : t2('dayPass');
	const gymName = gymData[`name_${locale}`];
	const openSignBottomSheet = () => {
		return new Promise<string | boolean>((resolve) => {
			overlay.open(({ isOpen, close, exit }) => (
				<BottomSheet
					title={`${t('title', { type: passType })}`}
					open={isOpen}
					onClose={() => {
						close();
						setTimeout(() => {
							resolve(false);
							exit();
						}, 200);
					}}
				>
					<p className="text-[14px] mb-2 text-black/60 font-medium">{t('bottomSheetDesc')}</p>
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

		const { url } = await upload(`signature/${fileName}`, new File([blob], fileName, { type: 'image/png' }), {
			access: 'public',
			handleUploadUrl: '/api/pass/upload',
		});

		const { consent, ...withoutConsent } = data;
		const body = { ...withoutConsent, type, gym, signature: url };

		mutate(body);
		setIsImageUploading(false);
	};

	return (
		<FormProvider {...methods}>
			<div className="px-5 mt-5">
				<h1
					className={cn('whitespace-pre-wrap mt-4 mb-6 text-lg font-bold text-center', {
						['!text-base']: locale === 'en',
					})}
				>
					<span className="text-darkBlue">{gymName}</span>
					<span>{` ${t('title', { type: passType })}`}</span>
				</h1>
				<form className="flex flex-col w-full gap-6" onSubmit={handleSubmit(onSubmit)}>
					<TextInput name="name" label={t('name')} maxLength={30} />
					<TextInput
						name="phoneNumber"
						label={t('phoneNumber')}
						placeholder={t('phoneNumberPlaceholder')}
						onChange={(e) => setValue('phoneNumber', e.target.value.replace(/[^0-9]/g, ''))}
						maxLength={11}
						inputMode="numeric"
					/>
					<Controller
						control={control}
						name="dateOfBirth"
						render={({ field }) => {
							const { ref, ...rest } = field;
							return (
								<PatternFormat {...rest} customInput={TextInputBirth} format="####/##/##" mask={'_'} />
							);
						}}
					/>
					<div className="p-4 border-2 bg-slate-100 border-gray-300 rounded">
						<div className="flex gap-2 items-center">
							<input
								{...methods.register('shoesRental')}
								id="shoesRental"
								type="checkbox"
								className={cn(
									'w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer text-main focus:ring-main focus:ring-2',
									{ '!bg-gray-400 !ring-0 !cursor-default': isExperience }
								)}
								{...(isExperience && { checked: true, readOnly: true })}
							/>
							<label
								htmlFor="shoesRental"
								className={cn('text-sm text-gray-500 font-bold', { '!text-gray-400': isExperience })}
							>
								{t('shoeRental')}
							</label>
						</div>
						{isExperience && <p className="text-xs text-gray-500 ml-2 mt-2">{t('shoeNotice')}</p>}
					</div>
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
								<label htmlFor="consent" className="ml-2 text-base font-medium text-gray-500">
									{t('consentCheckbox')}
								</label>
							</div>
						</div>
					</div>
					<Button type="submit" label={t('nextButton')} disabled={!isValid || isSubmitting} />
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
