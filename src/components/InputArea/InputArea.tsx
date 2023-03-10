import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useChat } from '@/lib/chat';

type formValue = {
  content: string;
};

export const InputArea: React.FC = () => {
  const { sendMessage } = useChat();

  const form = useForm<formValue>({
    initialValues: {
      content: '',
    },
  });

  const onSubmit = (values: formValue) => {
    const { content } = values;
    form.reset();
    if (content) {
      sendMessage(content);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={form.onSubmit(onSubmit)} id="post-message-form">
          <Flex>
            <TextInput
              name="content"
              autoComplete="off"
              placeholder="ここに入力してメッセージを送信"
              sx={{ flex: 1 }}
              {...form.getInputProps('content')}
            />
            <Button variant="default" type="submit">
              送信
            </Button>
          </Flex>
        </form>
      </div>
    </>
  );
};
