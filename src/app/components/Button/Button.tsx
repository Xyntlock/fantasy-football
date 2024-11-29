import { Button as FlowbiteButton } from 'flowbite-react'
import type { AllHTMLAttributes, ComponentProps, ReactNode } from 'react'
import * as Styled from './Button.styles'

type NativeButtonProps = AllHTMLAttributes<HTMLButtonElement>

type ButtonProps = {
  children: ReactNode
  className?: NativeButtonProps['className']
  size?: Exclude<Styled.ButtonVariants['size'], null>
  'margin-x'?: Exclude<Styled.ButtonVariants['margin-x'], null>
  'margin-y'?: Exclude<Styled.ButtonVariants['margin-y'], null>
  pill?: boolean
} & ComponentProps<typeof FlowbiteButton>

export const Button = ({
  children,
  className = '',
  size = 'md',
  'margin-y': marginY,
  'margin-x': marginX,
  pill = false,
  ...props
}: ButtonProps) => (
  <FlowbiteButton
    {...props}
    pill={pill}
    size={size}
    className={Styled.button(
      { 'margin-y': marginY, 'margin-x': marginX },
      className
    )}
  >
    {children}
  </FlowbiteButton>
)
