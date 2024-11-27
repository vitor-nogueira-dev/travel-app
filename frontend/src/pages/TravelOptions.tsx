import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, SimpleGrid, HStack, Container, Circle } from '@chakra-ui/react';
import { toast } from 'sonner'
import { LuClock, LuEqualNot, LuMap, LuPinOff } from 'react-icons/lu';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import polyline from 'polyline';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { AppDispatch, RootState } from '../store/store';
import { setSelectedDriver, createTrip } from '../store/travelSlice';

import { useColorModeValue } from '@/components/ui/color-mode';
import EmptyStateComponent from '@/components/common/EmptyStateComponent';
import TravelOptionCard from '@/components/travel/TravelOptionCard';

import { IDriver } from '@/interfaces/IDriver';

const createCustomIcon = (text: string, bgColor: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${bgColor}; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold;">${text}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const IconA = createCustomIcon('A', '#4a90e2');
const IconB = createCustomIcon('B', '#50c878');

const TravelOptions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { tripOptions, loading } = useSelector((state: RootState) => state.travel);

  const hightLightColorIcon = useColorModeValue('black', 'cyan');

  const handleChooseDriver = useCallback(async (driver: IDriver) => {
    try {
      dispatch(setSelectedDriver(driver));
      await dispatch(createTrip()).unwrap();
      navigate('/travel-history');
    } catch (error) {
      console.error('Error confirming trip:', error);
      toast.error('Erro', {
        description: "Falha ao confirmar a viagem. Tente novamente.",
      });
    }
  }, [dispatch, navigate]);


  if (!tripOptions) {
    return (
      <EmptyStateComponent
        icon={<LuPinOff color={hightLightColorIcon} />}
        title="Sem opções de viagem"
        description="Crie uma nova viagem para visualizar as opções disponíveis."
      />
    );
  }

  const { origin, destination } = tripOptions;
  const routeCoordinates = polyline.decode(tripOptions.routeResponse.polyline.encodedPolyline);

  const mapCenter = [
    (origin.latitude + destination.latitude) / 2,
    (origin.longitude + destination.longitude) / 2
  ];

  return (
    <Container display="flex" flexDirection="column">
      <Heading as="h2" size="xl" w="100" display="inline-block" mb={6} textAlign="center">Opções de Viagem</Heading>
      <Container gap="4" display="flex" flexDirection="column">
        <Box w="100%" h={{ base: '40vh', md: '100' }}>
          <MapContainer
            center={mapCenter as [number, number]}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            zoomAnimation={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[origin.latitude, origin.longitude]} icon={IconA}>
              <Popup>
                Origem (A)
              </Popup>
            </Marker>
            <Marker position={[destination.latitude, destination.longitude]} icon={IconB}>
              <Popup>Destino (B)</Popup>
            </Marker>
            <Polyline positions={routeCoordinates as [number, number][]} color="red" />
          </MapContainer>
        </Box>
        <Box flex={{ base: 2, md: 1 }}>
          <Box
            p={4}
            borderRadius="md"
            maxW="xl"
            margin="0 auto"
            rounded="lg"
            borderWidth={1}
            shadow="md"
            mb={6}
          >
            <Heading as="h3" size="md" mb={4} textAlign="center">Detalhes da Rota</Heading>
            <SimpleGrid columns={[1, 2]} gap={{ base: '6px' }} justifyContent="center" alignItems="center" display="flex" flexWrap="wrap">
              <HStack cursor="pointer">
                <Circle size="30px" color="purple.500" >
                  <LuMap />
                </Circle>
                <Text>Distância: {tripOptions.distance} m</Text>
              </HStack>
              <HStack cursor="pointer">
                <Circle size="30px" color="orange.500">
                  <LuClock />
                </Circle>
                <Text fontWeight="medium">Duração: {tripOptions.duration}</Text>
              </HStack>
            </SimpleGrid>
          </Box>
          {tripOptions.options.length === 0 ? (
            <EmptyStateComponent
              icon={<LuEqualNot color={hightLightColorIcon} />}
              title="Sem motoristas disponíveis"
              description="Nenhum motorista disponível para a rota selecionada."
            />
          ) : (
            <SimpleGrid columns={[1, null, 2, 3]} gap="40px" h={{ base: '50vh', md: 'auto' }} overflow="auto">
              {
                tripOptions.options.map((driver) => (
                  <TravelOptionCard
                    key={driver.id}
                    driver={driver}
                    hightLightColorIcon={hightLightColorIcon}
                    loading={loading}
                    handleChooseDriver={handleChooseDriver}
                  />
                ))}
            </SimpleGrid>
          )}
        </Box>
      </Container>
    </Container >
  );
};

export default TravelOptions;

