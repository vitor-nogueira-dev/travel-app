import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, HStack } from '@chakra-ui/react';
import { LuCar, LuHistory, LuPlus } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode"

const Header: React.FC = () => {
  const highlightColor = useColorModeValue('cyan.500', 'cyan.300');
  const hightLightColorIcon = useColorModeValue('black', 'white');

  return (
    <Box as="header" bg={{ base: "white", _dark: "gray.900" }} color="white" shadow="md">
      <Flex maxW="container.xl" mx="auto" px={4} py={4} justifyContent="space-between" alignItems="center" flexWrap="wrap" flexDirection={{ base: 'column', sm: 'row' }} gap={{ base: '8px', sm: '0' }}>
        <RouterLink to="/">
          <Flex alignItems="center">
            <LuCar color={hightLightColorIcon} size={24} />
            <Heading as="h1" size="lg" ml={2} color={highlightColor}>TravelApp</Heading>
          </Flex>
        </RouterLink>
        <HStack as="nav">
          <ColorModeButton colorPalette="cyan" />
          <RouterLink to="/">
            <Button colorPalette="cyan" variant="outline">
              <LuPlus />
              Nova Viagem
            </Button>
          </RouterLink>
          <RouterLink to="/travel-history">
            <Button colorPalette="cyan" variant="outline">
              <LuHistory />
              Histórico
            </Button>
          </RouterLink>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
