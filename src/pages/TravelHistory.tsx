import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, SimpleGrid, Input, Container, createListCollection } from '@chakra-ui/react';
import { toast } from 'sonner'
import { LuFilter, LuPinOff, LuX } from 'react-icons/lu';

import { AppDispatch, RootState } from '../store/store';
import { fetchDrivers, fetchTravelHistory, setTravelHistory, setUserId } from '../store/travelSlice';

import { Button } from '@/components/ui/button';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { useColorModeValue } from '@/components/ui/color-mode';
import EmptyStateComponent from '@/components/common/EmptyStateComponent';
import TravelHistoryCard from '@/components/travel/TravelHistoryCard';

import { IErrorState } from '@/interfaces/IErrorState';

const TravelHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userId, travelHistory, loading, drivers: driversState } = useSelector((state: RootState) => state.travel);

  const [selectedDriver, setSelectedDriver] = useState<string>();

  const fetchData = useCallback(async () => {
    try {
      await dispatch(fetchTravelHistory(undefined));
      await dispatch(fetchDrivers());
    } catch (error) {
      console.error('Error [TravelHistory]', error);
      const errorMessage = (error as IErrorState)?.error_description || 'Erro desconhecido';
      toast.error('Erro', { description: errorMessage });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchData]);

  const handleFilter = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Erro', { description: 'Informe o ID do usuário' });
      return;
    }
    try {
      await dispatch(fetchTravelHistory(selectedDriver || undefined)).unwrap();
    } catch (error) {
      const errorMessage = (error as IErrorState)?.error_description || 'Erro desconhecido';
      toast.error('Erro', { description: errorMessage });
    }
  }, [dispatch, selectedDriver, userId]);

  const handleClearFilter = useCallback(async () => {
    dispatch(setTravelHistory({ customer_id: '', rides: [] }));
    dispatch(setUserId(''))
    setSelectedDriver(undefined)
  }, [dispatch]);

  const drivers = useMemo(() => createListCollection({
    items: driversState.map((driver) => ({
      label: driver.name,
      value: driver.id.toString(),
    })),
  }), [driversState]);

  const hightLightColorIcon = useColorModeValue('black', 'cyan');
  const highLightColor = useColorModeValue('cyan.500', 'cyan.300');

  console.log('TravelHistory', travelHistory);

  return (
    <Container h="100%">
      <Heading as="h2" size="xl" mb={6}>Histórico de Viagens</Heading>
      <Box as="form" onSubmit={handleFilter} display="flex" alignItems="center" justifyContent="center" gap={4} mb={6} flexWrap={{ base: "wrap", md: "nowrap" }}>

        <Input
          type="text"
          placeholder="ID do Usuário"
          value={userId}
          onChange={(e) => dispatch(setUserId(e.target.value))}
          colorPalette="cyan"
          variant="outline"
          _hover={{ borderColor: highLightColor, transition: 'all 0.2s' }}
        />

        <SelectRoot
          value={selectedDriver ? [selectedDriver] : []}
          collection={drivers}
          onValueChange={(e) => setSelectedDriver(e.value[0])}
          colorPalette="cyan"
          variant="outline"
          _hover={{ borderColor: highLightColor, transition: 'all 0.2s' }}
        >
          <SelectTrigger colorPalette="cyan">
            <SelectValueText placeholder="Selecione o Motorista" />
          </SelectTrigger>
          <SelectContent>
            {drivers.items.map((driver) => (
              <SelectItem item={driver} key={driver.value} cursor="pointer">
                {driver.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        <Button type="submit" colorPalette="cyan" variant="outline" loading={loading}>
          {!loading && <LuFilter />}
          {loading ? 'Carregando...' : 'Aplicar Filtro'}
        </Button>

        <Button colorPalette="cyan" variant="outline" onClick={handleClearFilter}>
          <LuX />
        </Button>
      </Box>

      {travelHistory.rides?.length === 0 ? (
        <EmptyStateComponent
          icon={<LuPinOff color={hightLightColorIcon} />}
          title="Sem Viagens"
          description="Nenhuma viagem encontrada para o filtro informado."
        />
      ) : (
        <SimpleGrid columns={[1, null, 2, 3]} gap={6} maxH="70vh" overflow="auto" p={4}>
          {travelHistory.rides?.map((trip) => (
            <TravelHistoryCard key={trip.id} trip={trip} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default TravelHistory;

