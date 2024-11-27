import React from 'react'
import { Box } from '@chakra-ui/react'

import { EmptyState } from '../ui/empty-state'

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const EmptyStateComponent: React.FC<Props> = ({ icon, title, description }) => {
  return (
    <Box textAlign="center" py={10}>
      <EmptyState
        maxW="xl"
        margin="0 auto"
        rounded="lg"
        borderWidth={1}
        shadow="md"
        icon={icon}
        title={title}
        description={description}
      />
    </Box>
  )
}

export default EmptyStateComponent