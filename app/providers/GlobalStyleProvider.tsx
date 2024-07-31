
'use client';

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useGlobalState } from '@/app/context/globalProvider';

interface Props {
  children: React.ReactNode;
}

export default function GlobalStyleProvider({ children }: Props) {
  const { theme } = useGlobalState();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles>{children}</GlobalStyles>
    </ThemeProvider>
  );
}

const GlobalStyles = styled.div`
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100%;
`;
