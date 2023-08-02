import classnames from 'classnames'
import type { LinkProps } from 'next/link'
import Link from 'next/link'

export interface PaginationButtonProps extends LinkProps {
  className?: string
  disabled?: boolean
  children?: any
}

export function PaginationButton(props: PaginationButtonProps) {
  const { disabled = false, className, children, ...rest } = props
  const classes = classnames(
    `transition-colors`,
    className,
    disabled
      ? 'cursor-not-allowed text-placeholder-color hover:text-placeholder-color'
      : 'text-regular-color hover:text-primary-color',
  )

  return disabled ? (
    <button disabled={disabled} className={classes}>
      {children}
    </button>
  ) : (
    <Link {...rest} className={classes}>
      {children}
    </Link>
  )
}
