import { Box, Fieldset, Heading, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import { Field } from '../ui/field'
import { Button } from '../ui/button'
import { useColorModeValue } from '../ui/color-mode'

interface TravelFormProps {
  loading: boolean
  handleSubmit: (e: React.FormEvent) => void
  inputsData: {
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
  }[];
}

const TravelForm: React.FC<TravelFormProps> = ({ loading, handleSubmit, inputsData }) => {

  const bgColor = useColorModeValue('white', 'gray.900');
  const highLightColor = useColorModeValue('cyan.500', 'cyan.300');

  return (
    <VStack bg={bgColor} gap="12px" as="form" onSubmit={handleSubmit} w="lg" p={6} shadow="md" rounded="md">
      <Box mb={4} display="flex" flexDirection="column" gap={4} w="full">
        <Heading as="h2" size="xl">Solicitar Viagem</Heading>
        <Text>Preencha os detalhes para iniciar sua viagem</Text>
      </Box>

      <Fieldset.Root>
        {inputsData.map(({ name, value, label, onChange }) => (
          <Fieldset.Content key={name}>
            <Field label={label}>
              <Input
                name={name}
                type='text'
                placeholder={label}
                value={value}
                onChange={onChange}
                colorPalette="cyan"
                variant="outline"
                _hover={{ borderColor: highLightColor, transition: 'all 0.2s' }}
              />
            </Field>
          </Fieldset.Content>
        ))}
      </Fieldset.Root>

      <Button type="submit" width="full" loading={loading} colorPalette="cyan" variant="outline" mt={2}>
        {loading ? 'Carregando...' : 'Estimar Valor da Viagem'}
      </Button>
    </VStack >
  )
}

export default TravelForm