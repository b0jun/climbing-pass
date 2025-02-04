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
      <div className="flex flex-col gap-4 rounded-md p-2">
        <div className="flex gap-2 rounded-md border bg-[#f4f7f9] p-4 text-sm">
          <span className="font-bold text-gray-500">이름</span>
          {name}
        </div>
        <div
          className={cn(
            'flex w-full items-center justify-between rounded-lg border-gray-300 text-base text-gray-900 placeholder:text-transparent',
          )}
        >
          <span className={cn('z-10 text-sm font-bold text-gray-500')}>패스 유형</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" className="peer sr-only" {...register('type')} />
            <div className="peer flex h-[32px] items-center rounded-sm bg-gray-400/70 px-1 text-sm font-medium text-gray-800 after:absolute after:h-[24px] after:w-[70px] after:rounded-sm after:bg-gray-200 after:transition-all after:content-[''] peer-checked:bg-yellow-300 peer-checked:text-yellow-800 peer-checked:after:translate-x-full peer-checked:after:bg-yellow-100 peer-focus:outline-none">
              <span className="z-10 w-[70px] text-center">일일이용</span>
              <span className="z-10 w-[70px] text-center">일일체험</span>
            </div>
          </label>
        </div>
        <div
          className={cn(
            'flex w-full items-center justify-between rounded-lg border-gray-300 text-base text-gray-900 placeholder:text-transparent',
          )}
        >
          <span className={cn('z-10 text-sm font-bold text-gray-500')}>암벽화 대여</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" className="peer sr-only" {...register('shoesRental')} />
            <div className="peer flex h-[32px] items-center rounded-sm bg-gray-400/70 px-1 text-sm font-medium text-gray-800 after:absolute after:h-[24px] after:w-[70px] after:rounded-sm after:bg-gray-200 after:transition-all after:content-[''] peer-checked:bg-blue-400 peer-checked:text-blue-900 peer-checked:after:translate-x-full peer-checked:after:bg-blue-100 peer-focus:outline-none">
              <span className="z-10 w-[70px] text-center">대여 안함</span>
              <span className="z-10 w-[70px] text-center">대여</span>
            </div>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default PassUpdateFormModal;
