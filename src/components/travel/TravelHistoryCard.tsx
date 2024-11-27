import { motion } from "framer-motion";
import { Badge, Box, Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { LuCalendar, LuClock, LuDollarSign, LuMap, LuMapPin } from "react-icons/lu";

import { useColorModeValue } from "../ui/color-mode";
import { Tooltip } from "../ui/tooltip";

import { ITravel } from "@/interfaces/ITravel";

const MotionBox = motion('div');

interface TravelHistoryCardProps {
  trip: ITravel;
}

const TravelHistoryCard: React.FC<TravelHistoryCardProps> = ({ trip }) => {
  const borderColor = useColorModeValue('cyan.200', 'cyan.600');
  const iconColor = useColorModeValue('cyan.500', 'cyan.300');

  return (
    <MotionBox
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        borderWidth: 1,
        borderRadius: '6px',
        borderColor: borderColor,
        boxShadow: 'md',
        overflow: 'hidden',
      }}
    >
      <Box p={6}>
        <VStack align="" gap={4}>
          <HStack justify="center" flexWrap="wrap">
            <Badge colorPalette="cyan" py={1} px={2} fontSize={14} textAlign="center" borderRadius="full">
              {trip.driver.name}
            </Badge>
          </HStack>
          <HStack justify="center">
            <Circle size="30px" color="red.500" >
              <LuCalendar />
            </Circle>
            <Text fontWeight="medium">{new Date(trip.date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(',', '')}</Text>
          </HStack>
          <HStack justify="center">
            <Tooltip content="Distância percorrida" showArrow>
              <HStack cursor="pointer">
                <Circle size="30px" color="purple.500" >
                  <LuMap />
                </Circle>
                <Text>{trip.distance} m</Text>
              </HStack>
            </Tooltip>
            <Tooltip content="Tempo de duração" showArrow>
              <HStack cursor="pointer">
                <Circle size="30px" color="orange.500">
                  <LuClock />
                </Circle>
                <Text fontWeight="medium">{trip.duration}</Text>
              </HStack>
            </Tooltip>
          </HStack>
          <VStack align={{ base: "flex-start", sm: "center", md: "flex-start" }} gap={2} >
            <HStack align="center" justify="start">
              <Box w="24px" mr={2}>
                <LuMapPin color={iconColor} />
              </Box>
              <Text fontWeight="medium" fontSize={14}>Origem: {trip.origin}</Text>
            </HStack>
            <HStack align="center" justify="center">
              <Box w="24px" mr={2}>
                <LuMapPin color={iconColor} />
              </Box>
              <Text fontWeight="medium" fontSize={14}>Destino: {trip.destination}</Text>
            </HStack>
          </VStack>
          <HStack justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="lg">Total:</Text>
            <HStack align="center">
              <Circle color="green.500" mr={2}>
                <LuDollarSign />
              </Circle>
              <Text fontWeight="bold" fontSize="xl">
                R$ {trip.value?.toFixed(2)}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default TravelHistoryCard;