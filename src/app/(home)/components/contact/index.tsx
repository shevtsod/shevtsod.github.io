'use client';

import Button from '@/components/button';
import ScrambledText from '@/components/scrambled-text';
import useFadeInView from '@/hooks/use-fade-in-view';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React, {
  type ComponentPropsWithoutRef,
  type ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type FieldError, type SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import BlogPromo from './blog-promo';
import Codec from './codec';
import CodecCall from './codec-call';
import styles from './contact.module.css';

export type ContactProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

const formSchema = z.object({
  name: z.string().min(1).max(64),
  email: z.email().max(320),
  message: z.string().min(1).max(2048),
});

type FormSchema = z.infer<typeof formSchema>;

/**
 * Renders the contact section.
 */
export default function Contact<T extends ElementType>({
  as,
  className,
  ...props
}: ContactProps<T>) {
  const Component = as ?? 'div';
  const t = useTranslations('app.(home).components.contact');
  const ref = useRef(null);
  const inView = useFadeInView(ref, { once: true, amount: 'all' });
  const [intro, setIntro] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid, errors, isSubmitSuccessful },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    setIntro(!window.location.hash);
  }, []);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
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

        throw new Error('Failed to submit');
      }

      return res.json();
    } catch (e: unknown) {
      console.error(e);
    }
  };

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        'dark relative py-6 dark:bg-black dark:text-theme-gray-100',
        className,
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={classNames(
          'container max-w-6xl mx-auto p-6',
          styles.form,
          // add intro class only if intro mode is enabled
          { [styles.intro]: inView && intro },
        )}
      >
        <Codec />

        <div className="max-w-4xl flex flex-col justify-center items-center gap-3 text-center mx-auto">
          <InputLabel error={errors.message}>
            <Input
              as="textarea"
              rows={4}
              maxLength={2048}
              placeholder={t('form.message')}
              {...register('message', { required: true })}
            />
          </InputLabel>

          <div className="self-stretch flex flex-col sm:flex-row gap-4">
            <InputLabel error={errors.name}>
              <Input
                type="text"
                placeholder={t('form.name')}
                {...register('name', { required: true })}
              />
            </InputLabel>

            <InputLabel error={errors.email}>
              <Input
                type="text"
                placeholder={t('form.email')}
                {...register('email', { required: true })}
              />
            </InputLabel>
          </div>

          <Button
            type="submit"
            className="text-center text-xl md:text-2xl px-2 py-1 font-bold w-full cursor-pointer"
            disabled={
              !isDirty || !isValid || isSubmitting || isSubmitSuccessful
            }
          >
            <ScrambledText className="inline-block w-full">
              {t('form.submit')}
            </ScrambledText>
          </Button>

          {/* Feedback */}
          <div className="font-retro font-bold text-lg md:text-2xl">
            {Object.entries(errors).map(([key, error]) => (
              <p key={key} className="text-theme-red-400">
                ✖ {error.message}
              </p>
            ))}

            {isSubmitSuccessful && (
              <p className="text-theme-green-400">✔ {t('form.submitted')}</p>
            )}
          </div>
        </div>

        <BlogPromo />
      </form>

      {/* Codec call overlay */}
      {inView && intro && (
        <CodecCall className="absolute top-0 left-0 h-full w-full" />
      )}
    </Component>
  );
}

export interface InputLabelProps extends HTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  children?: React.ReactNode;
}

export function InputLabel({ error, children }: InputLabelProps) {
  return (
    <label
      className={classNames('w-full flex flex-col gap-2', {
        'border-4 border-theme-red-400': error,
      })}
    >
      {children}
    </label>
  );
}

export type InputProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Input<T extends ElementType>({
  as,
  className,
  ...props
}: InputProps<T>) {
  const Component = as ?? 'input';

  return (
    <Component
      {...props}
      className={classNames(
        'bg-theme-gray-200/25 dark:bg-theme-gray-800/50 text-lg md:text-2xl font-bold w-full py-2 px-8 border-none border-4 rounded-none outline-hidden',
        className,
      )}
    />
  );
}
