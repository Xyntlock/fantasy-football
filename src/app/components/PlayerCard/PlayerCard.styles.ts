import { type VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const playerCardVariants = cva([], {
  variants: {
    width: {
      m: ['min-w-24'],
    },
    height: {
      m: ['min-h-24'],
    },
  },
  defaultVariants: {
    width: 'm',
    height: 'm',
  },
})

export type PlayerCardVariants = VariantProps<typeof playerCardVariants>
export const playerCard = (variants: PlayerCardVariants, className: string) =>
  twMerge(playerCardVariants({ ...variants, className }))
