import { Title } from '@mantine/core';

export const TitleHeader: React.FC = () => (
  <Title
    order={1}
    align="center"
    color="dark"
    ff="Nico Moji"
    fz={{ base: '2rem', xs: '3rem' }}
    sx={{ marginBottom: '32px' }}
  >
    のーろぐちゃっと
  </Title>
);
