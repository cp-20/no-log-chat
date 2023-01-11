import { Stack, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import Styles from '@/components/MemberList/member-list.module.scss';
import { membersAtom } from '@/lib/chat';

export const MemberList: React.FC = () => {
  const [members] = useAtom(membersAtom);
  return (
    <div className={Styles['member-list']}>
      オンライン : {members.length}
      <Stack>
        {members.map((member) => (
          <Text key={member}>{member}</Text>
        ))}
      </Stack>
    </div>
  );
};
