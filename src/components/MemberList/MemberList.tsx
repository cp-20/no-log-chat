import { IconUsers } from '@tabler/icons';
import { useMembersAtom } from '@/atoms/members';
import Styles from '@/components/MemberList/member-list.module.scss';

export const MemberList: React.FC = () => {
  const { members } = useMembersAtom();
  return (
    <div className={Styles['member-list']}>
      <IconUsers className={Styles['member-list-icon']} />
      <span className={Styles['member-list-counter']}>{members.length}</span>
    </div>
  );
};
