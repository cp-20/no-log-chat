import { FiUsers } from 'react-icons/fi';
import { useMembersAtom } from '@/atoms/members';
import Styles from '@/components/MemberList/member-list.module.scss';

export const MemberList: React.FC = () => {
  const { members } = useMembersAtom();
  if (members !== null) {
    return (
      <div className={Styles['member-list']}>
        <FiUsers className={Styles['member-list-icon']} />
        <span className={Styles['member-list-counter']}>{members.length}</span>
      </div>
    );
  }

  return <></>;
};
