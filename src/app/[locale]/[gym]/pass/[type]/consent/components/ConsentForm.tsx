'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { overlay } from 'overlay-kit';
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { boolean } from 'zod';

import { BottomSheet, Button, Signature, Spinner, TextInput, TextInputBirth } from '@/shared/components';

import { PassValidType } from '../../types/passType.type';
import { useSubmitConsent } from '../hooks/useSubmitConsent';
import { ConsentFormData, consentSchema } from '../schema/consentSchema';
interface ConsentFormProps {
  type: PassValidType;
}

const ConsentForm = ({ type }: ConsentFormProps) => {
  const isExperience = type === 'day-experience';
  const { gym } = useParams();

  const locale = useLocale();
  const isKo = locale === 'ko';
  const tCommon = useTranslations('Common');
  const tConsent = useTranslations('Consent');

  const { mutate: formSubmitMutate, isPending } = useSubmitConsent();

  // Consent Form
  const methods = useForm<ConsentFormData>({
    resolver: zodResolver(consentSchema(tConsent, isKo)),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phoneNumber: '',
      dateOfBirth: '',
      shoesRental: isExperience,
      consent: false,
    },
  });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const openSignBottomSheet = () => {
    return new Promise<string | boolean>((resolve) => {
      overlay.open(({ isOpen, close, unmount }) => (
        <BottomSheet
          title={tConsent('title', { type: tCommon(type) })}
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          resolve={resolve}
        >
          <p className="mb-2 text-[14px] font-medium text-black/60">
            {tConsent('signatureDesc', { type: tCommon(type) })}
          </p>
          <Signature
            onConfirm={(value: string) => {
              close();
              resolve(value);
            }}
            signatureText={tConsent('signature')}
            signatureButton={tConsent('signatureButton')}
          />
        </BottomSheet>
      ));
    });
  };

  const onSubmit: SubmitHandler<ConsentFormData> = async (data) => {
    const signData = await openSignBottomSheet();
    if (!signData) {
      return;
    }
    formSubmitMutate({ formData: data, signData: signData as string, type, gymDomain: gym as string });
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30">
          <Spinner />
        </div>
      )}
      <FormProvider {...methods}>
        <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <TextInput name="name" label={tConsent('name')} maxLength={30} />
          <TextInput
            name="phoneNumber"
            label={tConsent('phoneNumber')}
            placeholder={tConsent('phoneNumberPlaceholder')}
            onChange={(e) => setValue('phoneNumber', e.target.value.replace(/[^0-9]/g, ''))}
            maxLength={11}
            inputMode="numeric"
            {...(!isKo && { isOptional: true })}
          />
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => {
              const { ref, ...rest } = field;
              return <PatternFormat {...rest} customInput={TextInputBirth} format="####/##/##" mask={'_'} />;
            }}
          />
          <ConsentForm.CheckboxField
            name="shoesRental"
            label={tConsent('shoeRental')}
            disabled={isExperience}
            description={isExperience ? tConsent('shoeNotice') : undefined}
          />
          <div>
            <h4 className="mb-2 text-sm font-bold text-gray-500">{tConsent('consent')}</h4>
            <div className="mb-1 whitespace-pre-wrap rounded-md border-2 border-gray-300 bg-white p-4 text-gray-500">
              {tConsent('consentDesc')}
            </div>
            <ConsentForm.CheckboxField name="consent" label={tConsent('consentCheckbox')} />
          </div>
          <Button type="submit" disabled={!isValid || isPending}>
            {tConsent('nextButton')}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

ConsentForm.CheckboxField = function CheckboxField({
  name,
  label,
  disabled = false,
  description,
}: {
  name: keyof ConsentFormData;
  label: string;
  disabled?: boolean;
  description?: string;
}) {
  const { register } = useFormContext<ConsentFormData>();
  return (
    <div className="rounded-md border-2 border-gray-300 bg-white p-4">
      <div className="flex items-center gap-2">
        <input
          {...register(name)}
          id={name}
          type="checkbox"
          disabled={disabled}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-main focus:ring-2 focus:ring-main disabled:cursor-default disabled:text-gray-400 disabled:ring-0"
        />
        <label htmlFor={name} className={cn('text-sm font-bold text-gray-500', { 'text-gray-400': disabled })}>
          {label}
        </label>
      </div>
      {description && <p className="mt-2 text-xs text-gray-500">{description}</p>}
    </div>
  );
};

export default ConsentForm;
