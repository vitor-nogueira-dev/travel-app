import React from 'react';
import { Box, Container } from '@chakra-ui/react';

import Header from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Container as="main" flex={1} py={8}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
