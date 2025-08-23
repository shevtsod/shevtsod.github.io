'use client';

import Button from '@/components/button';
import ScrambledText from '@/components/scrambled-text';
import useFadeInView from '@/hooks/use-fade-in-view';
import { useIntro } from '@/hooks/use-intro';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React, {
  type ComponentPropsWithoutRef,
  type ElementType,
  HTMLAttributes,
  useRef,
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
  message: z.string().min(1).max(1024),
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
  const formRef = useRef(null);
  const [intro] = useIntro();
  const formInView = useFadeInView(formRef, {
    once: true,
    margin: '-50% 0px -50% 0px',
    skip: !intro,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid, errors, isSubmitSuccessful },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

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
      {...props}
      className={classNames(
        'dark relative dark:bg-black dark:text-theme-gray-100',
        className,
      )}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={classNames(
          'container max-w-4xl mx-auto px-2 text-center',
          styles.form,
          // add intro class only if intro mode is enabled
          { [styles.intro]: formInView && intro },
        )}
      >
        <Codec />

        <div className="max-w-3xl mx-auto px-6 lg:px-0 flex flex-col gap-3">
          <InputLabel error={errors.message} className="relative">
            <Input
              as="textarea"
              rows={4}
              maxLength={1024}
              placeholder={t('form.message')}
              className="max-h-128"
              {...register('message', { required: true })}
            />
            {intro && (
              <div
                className={classNames(
                  'absolute h-full w-full z-1 bg-black text-start md:text-lg px-10',
                  styles.callout,
                  // add intro class only if intro mode is enabled
                  { [styles.intro]: formInView && intro },
                )}
              >
                {t('form.callout')}
              </div>
            )}
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
            className="text-center md:text-lg px-2 py-1 font-bold w-full cursor-pointer"
            disabled={
              !isDirty || !isValid || isSubmitting || isSubmitSuccessful
            }
          >
            <ScrambledText className="inline-block w-full">
              {t('form.submit')}
            </ScrambledText>
          </Button>

          {/* Feedback */}
          <div className="font-retro font-bold md:text-lg">
            {Object.entries(errors).map(([key, error]) => (
              <p key={key} className="text-theme-red-400">
                ⨉ {error.message}
              </p>
            ))}

            {isSubmitSuccessful && (
              <p className="text-theme-blue-200">◯ {t('form.submitted')}</p>
            )}
          </div>
        </div>
      </form>

      <BlogPromo
        className={classNames(
          styles.blogPromo,
          // add intro class only if intro mode is enabled
          { [styles.intro]: formInView && intro },
        )}
      />

      {/* Codec call overlay */}
      {formInView && intro && (
        <CodecCall className="absolute top-0 left-0 h-full w-full" />
      )}
    </Component>
  );
}

export interface InputLabelProps extends HTMLAttributes<HTMLLabelElement> {
  error?: FieldError;
  children?: React.ReactNode;
}

export function InputLabel({
  error,
  children,
  className,
  ...props
}: InputLabelProps) {
  return (
    <label
      {...props}
      className={classNames(
        'w-full flex flex-col gap-2',
        { 'outline-4 outline-theme-red-400': error },
        className,
      )}
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
        'bg-theme-gray-200/25 dark:bg-theme-gray-800/50 md:text-lg font-bold w-full py-2 px-8 rounded-none outline-none',
        className,
      )}
    />
  );
}
