import { websiteMetadata } from '@/utils'
import Link from 'next/link'
import { Icon } from '../Icon'

export function Footer() {
  return (
    <footer className="max-w-main box-border m-auto px-4">
      <div className="py-10 border-t border-regular-color">
        <ul className="flex items-center justify-center">
          {websiteMetadata.linkGroup.map((item, index) => {
            return (
              <li key={index} className="mx-2">
                <a
                  href={item.url}
                  className="text-2xl text-secondary-color hover:text-primary-color transition-colors"
                  target="_blank"
                  title={item.label}
                >
                  <Icon name={item.icon} />
                </a>
              </li>
            )
          })}
        </ul>
        <div className="flex items-center justify-center mt-1 text-secondary-color text-sm">
          <span>Copyright © {new Date().getFullYear()}</span>
          <span className="mx-3">•</span>
          <Link
            href="/"
            className="hover:underline hover:text-primary-color transition-colors"
          >
            {websiteMetadata.title}
            <span className="mx-2">|</span>
            {websiteMetadata.domain}
          </Link>
        </div>
        <div className="flex items-center justify-center mt-1">
          <a
            href={websiteMetadata.filingUrl}
            target="_blank"
            className="text-secondary-color text-sm hover:underline hover:text-primary-color transition-colors"
          >
            {websiteMetadata.filing}
          </a>
        </div>
      </div>
    </footer>
  )
}
