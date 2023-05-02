import { websiteMetadata } from '@/utils'

export function Footer() {
  return (
    <footer className="max-w-screen-md m-auto py-4">
      <div className="flex items-center justify-center">
        <a href={websiteMetadata.filingUrl} target="_blank">
          {websiteMetadata.filing}
        </a>
        <p>
          Copyright © {new Date().getFullYear()} {websiteMetadata.domain}
        </p>
      </div>
    </footer>
  )
}
