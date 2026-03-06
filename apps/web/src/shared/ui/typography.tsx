import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const typographyVariants = cva('text-foreground scroll-m-20', {
  variants: {
    variant: {
      h1: 'text-[44px] font-semibold leading-11',
      h2: 'text-2xl font-bold leading-8', // default
      h3: 'text-xl font-semibold leading-6', // default
      h4: 'text-xl font-medium', // default
      p: 'text-sm font-normal leading-5 text-muted-foreground', // default
      blockquote: 'mt-6 border-l-2 pl-6', // default
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', // default
      label: 'text-muted-foreground text-[12px] font-medium leading-[16px] tracking-normal',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

const variantElementMap: Record<string, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blockquote: 'blockquote',
  code: 'code',
  label: 'span',
};

type TypographyBaseProps<T extends React.ElementType> = {
  as?: T;
} & VariantProps<typeof typographyVariants>;

type TypographyProps<T extends React.ElementType> = TypographyBaseProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyBaseProps<T>>;

export type TypographyVariant = VariantProps<typeof typographyVariants>['variant'];

export function Typography<T extends React.ElementType = 'p'>({
  className,
  variant = 'p',
  as,
  ...props
}: TypographyProps<T>) {
  const Component = as ?? variantElementMap[variant as string] ?? 'p';

  return <Component className={cn(typographyVariants({ variant, className }))} {...props} />;
}
