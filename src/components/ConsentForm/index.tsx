'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useOverlay } from '@toss/use-overlay';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import BottomSheet from '../BottomSheet';
import Button from '../Button';
import Signature from '../Signature';
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
	signatureTitle: string;
	submitButton: string;
	nextButton: string;
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
	signatureTitle,
	submitButton,
	nextButton,
}: Props) => {
	const methods = useForm<FormData>(formInit());
	const {
		formState: { isValid },
		handleSubmit,
	} = methods;

	const { replace } = useRouter();
	const { gym } = useParams();
	// const { replace } = useLocalizedRouter();

	const overlay = useOverlay();
	const openSignBottomSheet = () => {
		return new Promise<boolean>((resolve) => {
			overlay.open(({ isOpen, close, exit }) => (
				<BottomSheet
					title={signatureTitle}
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
						label={signature}
						buttonLabel={submitButton}
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
					<Button
						label={nextButton}
						onClick={handleSubmit(onSubmit)}
						disabled={!isValid}
					/>
				</div>
			</div>
		</FormProvider>
	);
};

export default ConsentForm;
