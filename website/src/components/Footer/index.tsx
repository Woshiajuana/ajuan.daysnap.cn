import { websiteMetadata } from '@/utils'

export function Footer() {
  return (
    <footer className="max-w-screen-md m-auto">
      <div>
        <a href={websiteMetadata.filingUrl} target="_blank">
          {websiteMetadata.filing}
        </a>
      </div>
    </footer>
  )
}
