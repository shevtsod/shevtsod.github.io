import classNames from 'classnames';
import {
  ComponentPropsWithoutRef,
  ElementType,
  Ref,
  forwardRef,
  useRef,
} from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
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
  className,
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
        const json = await res.json();

        for (const { field, code, message } of json?.errors ?? []) {
          setError(field, { type: code, message });
        }
      }

      return res.json();
    } catch (e: unknown) {
      console.log(e);
    }
  };

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        'container mx-auto p-6 flex flex-col items-center',
        className
      )}
    >
      <Heading
        as="h2"
        className="mb-4 uppercase text-center"
        href={`#${props.id}`}
      >
        {t('title')}
      </Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="w-full lg:w-2/3 xl:w-1/2 flex flex-col justify-center items-center gap-4 text-center"
      >
        <InputLabel
          text={
            <span>
              <span className="text-theme-red-400 font-bold">*</span>{' '}
              {t('form.name')}
            </span>
          }
          error={errors.name}
        >
          <TextInput
            type="text"
            {...register('name', { required: true })}
            className="text-center"
          />
        </InputLabel>

        <InputLabel
          text={
            <span>
              <span className="text-theme-red-400 font-bold">*</span>{' '}
              {t('form.email')}
            </span>
          }
          error={errors.email}
        >
          <TextInput
            type="text"
            {...register('email', { required: true })}
            className="text-center"
          />
        </InputLabel>

        <InputLabel
          text={
            <span>
              <span className="text-theme-red-400 font-bold">*</span>{' '}
              {t('form.message')}
            </span>
          }
          error={errors.message}
        >
          <TextareaInput
            rows={4}
            {...register('message', { required: true })}
          />
        </InputLabel>

        <Button
          type="submit"
          className="text-center text-xl md:text-2xl"
          disabled={!isDirty || !isValid || isSubmitting || isSubmitSuccessful}
        >
          <p className="px-2 font-bold">{t('form.submit')}</p>
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

export interface InputLabelProps {
  text?: React.ReactNode;
  error?: FieldError;
  children?: React.ReactNode;
}

export function InputLabel({ text, error, children }: InputLabelProps) {
  return (
    <label className="w-full">
      <span className="block">{text}</span>
      {children}
      {error && <p className="text-theme-red-400 italic">{error.message}</p>}
    </label>
  );
}

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = forwardRef(
  ({ className, ...props }: TextInputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        {...props}
        className={classNames(
          'bg-theme-gray-600 w-full p-2 border-none border-4 rounded-none outline-hidden',
          className
        )}
      />
    );
  }
);

export interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextareaInput = forwardRef(
  (
    { className, ...props }: TextareaInputProps,
    ref: Ref<HTMLTextAreaElement>
  ) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={classNames(
          'bg-theme-gray-600 w-full p-2 border-none rounded-none resize-none outline-hidden',
          className
        )}
      />
    );
  }
);
