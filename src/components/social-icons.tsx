// src/components/social-icons.tsx

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

type SocialKind = 'github' | 'linkedin' | 'mail';

interface Props {
  kind: SocialKind;
  href: string;
  size?: number;
}

export default function SocialIcon({ kind, href, size = 5 }: Props) {
  if (!href) return null;

  const icons = {
    github: <FaGithub size={size * 4} />,
    linkedin: <FaLinkedin size={size * 4} />,
    mail: <FaEnvelope size={size * 4} />,
  };

  return (
    <a
      className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {icons[kind]}
    </a>
  );
}
