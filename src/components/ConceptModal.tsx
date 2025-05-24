import type { ConceptNode } from '../data/concepts';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Badge,
} from '@chakra-ui/react';

interface ConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept: ConceptNode | null;
}

export const ConceptModal = ({ isOpen, onClose, concept }: ConceptModalProps) => {
  if (!concept) return null;

  const categoryColors = {
    math: 'blue',
    physics: 'green',
    chemistry: 'red',
  } as const;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {concept.name}
          <Badge ml={2} colorScheme={categoryColors[concept.category]}>
            {concept.category}
          </Badge>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontSize="lg">{concept.description}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}; 