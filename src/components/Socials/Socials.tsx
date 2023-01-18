import { FaTwitter, FaDiscord } from 'react-icons/fa';
import { Link } from '@/components/Link/Link';
import Styles from '@/components/Socials/socials.module.scss';

export const Socials: React.FC = () => (
  <div className={Styles['social-container']}>
    <Link
      href="https://twitter.com/__cp20__"
      isExternal
      className={Styles['social-link']}
    >
      <FaTwitter />
      <span>開発者のついった</span>
    </Link>
    <Link
      href="https://discord.gg/YQ7negGTUK"
      isExternal
      className={Styles['social-link']}
    >
      <FaDiscord />
      <span>サポートコミュニティ</span>
    </Link>
  </div>
);
