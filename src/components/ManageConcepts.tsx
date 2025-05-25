import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { dbOperations } from '../data/db';
import type { ConceptNode, ConceptLink } from '../data/concepts';

export function ManageConcepts() {
  const [concepts, setConcepts] = useState<ConceptNode[]>([]);
  const [links, setLinks] = useState<ConceptLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [loadedConcepts, loadedLinks] = await Promise.all([
        dbOperations.getAllConcepts(),
        dbOperations.getAllLinks()
      ]);
      setConcepts(loadedConcepts);
      setLinks(loadedLinks);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center height="calc(100vh - 100px)">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <Alert status="info">
          <AlertIcon />
          <Text>The application is in read-only mode. Data is loaded from JSON files.</Text>
        </Alert>

        {/* Concepts Table */}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {concepts.map((concept) => (
              <Tr key={concept.id}>
                <Td>{concept.id}</Td>
                <Td>{concept.name}</Td>
                <Td>{concept.category}</Td>
                <Td>{concept.description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Links Table */}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Source</Th>
              <Th>Target</Th>
            </Tr>
          </Thead>
          <Tbody>
            {links.map((link) => (
              <Tr key={`${link.source}-${link.target}`}>
                <Td>{concepts.find((c) => c.id === link.source)?.name || link.source}</Td>
                <Td>{concepts.find((c) => c.id === link.target)?.name || link.target}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
} 