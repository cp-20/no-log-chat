import useSound from 'use-sound';

export const useNotification = () => {
  const [playSound] = useSound('notification.mp3', {
    interrupt: true,
  });

  const notify = () => playSound();

  return { notify };
};
