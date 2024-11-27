import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { toast } from 'sonner';

import { AppDispatch, RootState } from '@/store/store';
import { setUserId, setOrigin, setDestination, fetchTripOptions } from '@/store/travelSlice';

import TravelForm from '@/components/travel/TravelForm';

import { IErrorState } from '@/interfaces/IErrorState';

import carSvg from '/car.svg';

interface InputData {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

interface ErrorMapping {
  key: string;
  value: string;
  message: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { userId, origin, destination, loading } = useSelector((state: RootState) => state.travel);

  const validationFields: ErrorMapping[] = useMemo(() => ([
    { key: 'user_id', value: userId, message: 'Informe o ID do usuário' },
    { key: 'origin', value: origin, message: 'Informe o endereço de origem' },
    { key: 'destination', value: destination, message: 'Informe o endereço de destino' },
  ]), [destination, origin, userId]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    for (const field of validationFields) {
      if (!field.value) {
        toast.error('Erro', {
          description: field.message,
        });
        return;
      }
    }
    try {
      await dispatch(fetchTripOptions()).unwrap();
      setUserId('');
      setOrigin('');
      setDestination('');
      navigate('/travel-options');
    } catch (error) {
      const errorMessage = (error as IErrorState)?.error_description || 'Erro desconhecido';
      toast.error('Erro', {
        description: errorMessage,
      });
    }
  }, [validationFields, dispatch, navigate]);


  const inputsData: InputData[] = [
    { name: 'userId', value: userId, onChange: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setUserId(e.target.value)), label: 'ID do Usuário' },
    { name: 'origin', value: origin, onChange: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setOrigin(e.target.value)), label: 'Endereço de Origem' },
    { name: 'destination', value: destination, onChange: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setDestination(e.target.value)), label: 'Endereço de Destino' },
  ]

  return (
    <Box m="auto" maxW="fit" display="flex" alignItems="center" justifyContent="center" gap={6} flexWrap="wrap" minH="80vh">
      <Box>
        <img src={carSvg} alt="Ícone de um usuário sentado em um táxi olhando para o celular" width={400} height={200} />
      </Box>
      <TravelForm
        loading={loading}
        handleSubmit={handleSubmit}
        inputsData={inputsData}
      />
    </Box>
  );
};

export default Home;

