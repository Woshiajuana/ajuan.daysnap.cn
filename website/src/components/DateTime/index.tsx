import classnames from 'classnames'
import dayjs, { type ConfigType } from 'dayjs'
import type { TimeHTMLAttributes } from 'react'

export interface DateTimeProps extends TimeHTMLAttributes<HTMLTimeElement> {
  time?: ConfigType
  template?: string
}

export function DateTime(props: DateTimeProps) {
  const { time, template, className, ...rest } = props

  return (
    <time
      {...rest}
      className={classnames(
        `inline-block text-sm text-placeholder-color tracking-wide  font-light`,
        className,
      )}
    >
      {dayjs(time).format(template)}
    </time>
  )
}
