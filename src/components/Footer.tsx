// src/components/Footer.tsx

import CustomLink from './Link';
import siteMetadata from '@/data/siteMetadata';
import SocialIcon from './social-icons';

export default function Footer() {
  return (
    <footer className="border-t mt-8 border-gray-200 dark:border-gray-700 py-4">
      <div className="flex flex-col items-center space-y-4 text-sm text-gray-600 dark:text-gray-400">
        {/* Info & Link */}
        <div className="flex flex-wrap justify-center gap-2 text-center text-sm">
          <span>{siteMetadata.author}</span>
          <span>•</span>
          <span>© {new Date().getFullYear()}</span>
          <span>•</span>
          <CustomLink
            href={siteMetadata.siteRepo ?? '#'}
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
          >
            {siteMetadata.title}
            <span>-</span>
            <span className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
              v{siteMetadata.version}
            </span>
          </CustomLink>
          <span>•</span>
          <CustomLink
            href="/about"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
          >
            About
          </CustomLink>
        </div>
      </div>
    </footer>
  );
}
