import Link from 'next/link';
import { useUsernameAtom } from '@/atoms/username';
import Styles from '@/components/TweetButton/tweet-button.module.scss';

const url = encodeURIComponent('https://no-log-chat.vercel.app/');
const text = (username: string) =>
  `のーろぐちゃっとで${username}さんと会話しましょう！`;

export const TweetButton = () => {
  const username = useUsernameAtom();

  return (
    <Link
      href={`https://twitter.com/intent/tweet?url=${url}&text=${text(
        username,
      )}&hashtags=のーろぐちゃっと`}
      className={Styles['tweet-button']}
      about="_blank"
      rel="noopener noreferrer"
    >
      Twitterで友達を呼ぶ
    </Link>
  );
};
