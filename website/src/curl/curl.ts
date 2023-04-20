import qs from 'querystring'
import { formatPathParams } from '@daysnap/utils'
import { ResponseData } from '@/types'
import { RESPONSE_CODE, BASE_URL } from '@/constants'

export const curl = async <T>(
  url: string,
  params: any = {},
  options?: RequestInit,
): Promise<T> => {
  // options
  options = Object.assign({ method: 'get' }, options)

  // path 参数替换
  ;({ path: url, rest: params } = formatPathParams(url, params))

  let body: BodyInit | null = null
  if (options.method!.toLocaleLowerCase() === 'get' && params) {
    url = `${url}?${qs.stringify(params)}`
  } else if (params && typeof params === 'object') {
    body = JSON.stringify(params)
  }

  if (!url.startsWith('http')) {
    url = `${BASE_URL}${url}`
  }

  const response = await fetch(url, {
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  })

  const { data, msg, code }: ResponseData<T> = await response.json()

  console.log('code => ', code, url)
  if (code !== RESPONSE_CODE.SUCCESS) {
    throw new Error(msg)
  }

  return data
}
