import { type VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva(['flex', 'flex-wrap', 'gap-2'], {
  variants: {
    size: {
      xs: [],
      sm: [],
      md: [],
      lg: [],
      xl: [],
    },
    'margin-x': {
      none: ['mx-0'],
      xs: ['mx-1'],
      sm: ['mx-2'],
    },
    'margin-y': {
      none: ['my-0'],
    },
  },
  defaultVariants: {
    size: 'md',
    'margin-x': 'none',
    'margin-y': 'none',
  },
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
export const button = (variants: ButtonVariants, className: string) =>
  twMerge(buttonVariants({ ...variants, className }))
