import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { usernameAtom } from '@/atoms/username';
import { TitleHeader } from '@/components/TitleHeader/TitleHeader';
import { useChat } from '@/lib/chat';
type Props = {
  connect: () => void;
};

type formValues = {
  username: string;
};

export const ConnectionPanel: React.FC<Props> = ({ connect }) => {
  const { join } = useChat();

  const [defaultUsername, setUsernameStorage] = useLocalStorage({
    key: 'username',
    defaultValue: '',
  });

  const [_, setUsername] = useAtom(usernameAtom);
  const form = useForm<formValues>({
    initialValues: { username: defaultUsername },
    validate: {
      username: (value) => (value ? null : '名前を入力してください'),
    },
  });

  useEffect(() => {
    form.setValues({ username: defaultUsername });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultUsername]);

  const onSubmit = (values: formValues) => {
    const { username } = values;
    setUsernameStorage(username);
    setUsername(username);
    join(username);
    connect();
  };

  return (
    <>
      <TitleHeader />

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Flex>
          <TextInput
            autoComplete="off"
            sx={{ flex: 1 }}
            placeholder="ニックネームを入力"
            {...form.getInputProps('username')}
          />
          <Button variant="default" type="submit">
            参加
          </Button>
        </Flex>
      </form>
    </>
  );
};
