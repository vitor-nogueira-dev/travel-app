import React from 'react'
import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import { LuCar, LuDollarSign, LuStar } from 'react-icons/lu'

import { Blockquote } from '../ui/blockquote'
import { Button } from '../ui/button'

import { IDriver } from '@/interfaces/IDriver'

interface TravelOptionCardProps {
  driver: IDriver;
  hightLightColorIcon: string;
  loading: boolean;
  handleChooseDriver: (driver: IDriver) => void;
}

const TravelOptionCard: React.FC<TravelOptionCardProps> = ({ driver, hightLightColorIcon, loading, handleChooseDriver }) => {
  return (
    <Box key={driver.id} borderWidth={1} borderRadius="lg" p={6} display="flex" justifyContent="space-between" flexDirection="column" alignItems="start" h="100" gap={4}>
      <Heading as="h4" size="md">{driver.name}</Heading>
      <Blockquote colorPalette="cyan" h="auto">{driver.description}</Blockquote>
      <HStack display="flex" justifyContent="flex-start">
        <Box w="20px">
          <LuCar size={18} color={hightLightColorIcon} />
        </Box>
        <Text fontSize={14}>{driver.vehicle}</Text>
      </HStack>
      <HStack>
        <HStack>
          <Text>Avaliação:</Text>
          <HStack>
            {Array.from({ length: driver.review.rating }).map((_, index) => (
              <LuStar color="gold" key={index} />
            ))}
          </HStack>
        </HStack>
      </HStack>
      <HStack>
        <LuDollarSign size={18} color={hightLightColorIcon} />
        <Text fontWeight="bold">Preço: R$ {driver.value.toFixed(2)}</Text>
      </HStack>
      <Button
        onClick={() => handleChooseDriver(driver)}
        disabled={loading}
        colorPalette="cyan"
        variant="outline"
        w="full"
      >
        {loading ? 'Processando...' : 'Escolher'}
      </Button>
    </Box>
  )
}

export default TravelOptionCard