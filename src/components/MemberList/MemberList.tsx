import { IconUsers } from '@tabler/icons';
import { useAtom } from 'jotai';
import Styles from '@/components/MemberList/member-list.module.scss';
import { membersAtom } from '@/lib/chat';

export const MemberList: React.FC = () => {
  const [members] = useAtom(membersAtom);
  return (
    <div className={Styles['member-list']}>
      <IconUsers className={Styles['member-list-icon']} />
      <span className={Styles['member-list-counter']}>{members.length}</span>
    </div>
  );
};
