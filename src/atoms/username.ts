import { atom, useAtom } from 'jotai';

export const usernameAtom = atom('');

export const useUsernameAtom = () => {
  const [atom] = useAtom(usernameAtom);

  return atom;
};
