import { IconBrandTwitter, IconBrandDiscord } from '@tabler/icons';
import { Link } from '@/components/Link/Link';
import Styles from '@/components/Socials/socials.module.scss';

export const Socials: React.FC = () => (
  <div className={Styles['social-container']}>
    <Link
      href="https://twitter.com/__cp20__"
      isExternal
      className={Styles['social-link']}
    >
      <IconBrandTwitter />
      <span>開発者のついった</span>
    </Link>
    <Link
      href="https://discord.gg/YQ7negGTUK"
      isExternal
      className={Styles['social-link']}
    >
      <IconBrandDiscord />
      <span>サポートコミュニティ</span>
    </Link>
  </div>
);
