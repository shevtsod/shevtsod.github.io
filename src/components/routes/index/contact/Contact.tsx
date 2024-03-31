import classNames from 'classnames';
import {
  ComponentPropsWithoutRef,
  ElementType,
  Ref,
  forwardRef,
  useRef,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useFadeInView from '../../../../hooks/useFadeInView';
import Button from '../../../button/Button';
import Heading from '../../../heading/Heading';

export type ContactProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
};

export default function Contact<T extends ElementType>({
  as,
  ...props
}: ContactProps<T>) {
  const Component = as ?? 'div';
  const { t } = useTranslation('app', { keyPrefix: 'components.Contact' });
  const ref = useRef(null);
  useFadeInView(ref, { once: true });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid, errors, isSubmitSuccessful },
    setError,
  } = useForm<ContactFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const res = await fetch('https://formspree.io/f/meqyrrqq', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw await res.json();
      }

      return res.json();
    } catch (e: any) {
      for (const { field, code, message } of e?.errors) {
        setError(field, { type: code, message });
      }
    }
  };

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames('container mx-auto p-6')}
    >
      <Heading as="h2" className="mb-4 uppercase text-center">
        {t('title')}
      </Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col justify-center items-center gap-4 text-center"
      >
        <TextInput
          type="text"
          {...register('name', { required: true })}
          label={
            <span className="block">
              <span className="text-theme-red-400 font-bold">*</span>{' '}
              {t('form.name')}
            </span>
          }
        />

        {errors?.name?.message && (
          <p className="text-theme-red-400 italic">{errors.name.message}</p>
        )}

        <TextInput
          type="text"
          {...register('email', { required: true })}
          label={
            <span className="block">
              <span className="text-theme-red-400 font-bold">*</span>{' '}
              {t('form.email')}
            </span>
          }
        />

        {errors?.email?.message && (
          <p className="text-theme-red-400 italic">{errors.email.message}</p>
        )}

        <TextareaInput
          rows={5}
          {...register('message', { required: true })}
          label={
            <span className="block">
              <span className="text-theme-red-400 font-bold">*</span>{' '}
              {t('form.message')}
            </span>
          }
        />

        {errors?.message?.message && (
          <p className="text-theme-red-400 italic">{errors.message.message}</p>
        )}

        <Button
          type="submit"
          className="text-xl md:text-2xl"
          disabled={!isDirty || !isValid || isSubmitting || isSubmitSuccessful}
        >
          {t('form.submit')}
        </Button>

        {errors.root && (
          <p className="text-theme-red-400 italic">{errors.root.message}</p>
        )}
        {isSubmitSuccessful && (
          <p className="text-theme-green-400">{t('form.submitted')}</p>
        )}
      </form>
    </Component>
  );
}

export interface InputProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
}

export function Input({ label, children }: InputProps) {
  return (
    <label className="w-full md:w-2/3 xl:w-1/2">
      <span className="block">{label}</span>
      {children}
    </label>
  );
}

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const TextInput = forwardRef(
  ({ label, ...props }: TextInputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <Input label={label}>
        <input
          ref={ref}
          {...props}
          className="text-theme-gray-800 w-full p-2 border-theme-red-400 border-solid border-4"
        />
      </Input>
    );
  },
);

export interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
}

export const TextareaInput = forwardRef(
  ({ label, ...props }: TextareaInputProps, ref: Ref<HTMLTextAreaElement>) => {
    return (
      <Input label={label}>
        <textarea
          ref={ref}
          {...props}
          className="text-theme-gray-800 w-full p-2 border-theme-red-400 border-solid border-4 resize-none"
        />
      </Input>
    );
  },
);
