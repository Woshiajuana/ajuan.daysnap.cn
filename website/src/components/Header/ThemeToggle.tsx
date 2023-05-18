import classnames from 'classnames'
import { useTheme } from 'next-themes'
import { useMounted } from '@/hooks'
import { Icon } from '../Icon'

export interface ThemeToggleProps {
  className?: string
  onClick?: () => void
}

export function ThemeToggle(props: ThemeToggleProps) {
  const { className, onClick } = props
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  return (
    <button
      aria-label="Toggle Theme"
      className={classnames(
        'flex items-center justify-center text-regular-color hover:text-primary-color transition-colors h-9 w-9 border-regular-color border rounded-md',
        className,
      )}
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
        onClick?.()
      }}
    >
      <Icon size={20} name={mounted ? resolvedTheme : 'light'} />
    </button>
  )
}
