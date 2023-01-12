import { atom, useAtom } from 'jotai';

export const membersAtom = atom<string[]>([]);

export const useMembersAtom = () => {
  const [members, setMembers] = useAtom(membersAtom);

  const updateMembers = (newMembers: string[]) => {
    setMembers(newMembers);
  };

  return { members, updateMembers };
};
