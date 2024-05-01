import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Modal from '@/components/Modal';
import useUpdatePass from '@/services/useUpdatePass';

const PassUpdateSchema = z.object({
	shoesRental: z.boolean(),
	type: z.boolean(),
});

type PassUpdateSchemaType = z.infer<typeof PassUpdateSchema>;

type Props = {
	open: boolean;
	close: () => void;
	exit: () => void;
	id: string;
	name: string;
	shoesRental: boolean;
	type: 'DayPass' | 'DayExperience';
};

const PassUpdateFormModal = ({ open, close, exit, id, name, shoesRental, type }: Props) => {
	const methods = useForm<PassUpdateSchemaType>({
		resolver: zodResolver(PassUpdateSchema),
		mode: 'onBlur',
		defaultValues: {
			shoesRental,
			type: type === 'DayExperience',
		},
	});
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { isDirty },
	} = methods;

	const { mutate } = useUpdatePass();

	const onSubmit: SubmitHandler<PassUpdateSchemaType> = (data) => {
		const { shoesRental, type } = data;
		mutate({ id, shoesRental, type: type ? 'DayExperience' : 'DayPass' });
	};

	return (
		<Modal
			title="Pass 수정"
			open={open}
			onClose={() => {
				close();
				setTimeout(() => {
					exit();
				}, 200);
			}}
			onConfirm={() => {
				close();
				setTimeout(() => {
					exit();
					handleSubmit(onSubmit)();
				}, 200);
			}}
			confirmLabel="수정"
			disabled={!isDirty}
		>
			<div className="p-2 rounded-md flex flex-col gap-4">
				<div className="flex gap-2 text-sm border p-4 rounded-md bg-[#f4f7f9]">
					<span className="text-gray-500 font-bold">이름</span>
					{name}
				</div>
				<div
					className={cn(
						'placeholder:text-transparent items-center flex justify-between rounded-lg text-base w-full text-gray-900 border-gray-300'
					)}
				>
					<span className={cn('text-sm text-gray-500 z-10 font-bold')}>패스 유형</span>
					<label className="relative inline-flex cursor-pointer items-center">
						<input type="checkbox" className="peer sr-only" {...register('type')} />
						<div className="peer flex h-[32px] items-center rounded-sm bg-gray-400/70 font-medium px-1 text-sm text-gray-800  after:absolute after:h-[24px] after:w-[70px] after:rounded-sm peer-checked:text-yellow-800 peer-checked:after:bg-yellow-100 after:bg-gray-200  after:transition-all after:content-[''] peer-checked:bg-yellow-300 peer-checked:after:translate-x-full peer-focus:outline-none">
							<span className="w-[70px] text-center z-10">일일이용</span>
							<span className="w-[70px] text-center z-10">일일체험</span>
						</div>
					</label>
				</div>
				<div
					className={cn(
						'placeholder:text-transparent items-center flex justify-between rounded-lg text-base w-full text-gray-900 border-gray-300'
					)}
				>
					<span className={cn('text-sm text-gray-500 z-10 font-bold')}>암벽화 대여</span>
					<label className="relative inline-flex cursor-pointer items-center">
						<input type="checkbox" className="peer sr-only" {...register('shoesRental')} />
						<div className="peer flex h-[32px] items-center font-medium rounded-sm bg-gray-400/70 px-1 text-sm text-gray-800 after:absolute after:h-[24px] after:w-[70px] after:rounded-sm after:bg-gray-200 after:transition-all after:content-[''] peer-checked:after:bg-blue-100 peer-checked:text-blue-900 peer-checked:bg-blue-400 peer-checked:after:translate-x-full peer-focus:outline-none">
							<span className="w-[70px] text-center z-10">대여 안함</span>
							<span className="w-[70px] text-center z-10">대여</span>
						</div>
					</label>
				</div>
			</div>
		</Modal>
	);
};

export default PassUpdateFormModal;
