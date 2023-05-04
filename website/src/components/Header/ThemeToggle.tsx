import classnames from 'classnames'
import { useTheme } from 'next-themes'
import { useMounted } from '@/hooks'
import { Icon } from '../Icon'

export function ThemeToggle(props: { className?: string }) {
  const { className } = props
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  return (
    <button
      aria-label="Toggle Theme"
      className={classnames(
        'flex items-center justify-center h-9 w-9 bg-red-100',
        className,
      )}
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
    >
      <Icon size={20} name={mounted ? resolvedTheme : 'light'} />
    </button>
  )
}
