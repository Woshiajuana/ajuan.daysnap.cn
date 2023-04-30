import Link from 'next/link'

export function Logo() {
  return (
    <Link scroll={false} href="/" className="flex items-center text-lg">
      Ajuan Blog
    </Link>
  )
}
