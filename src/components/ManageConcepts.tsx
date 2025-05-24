import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { dbOperations } from '../data/db';
import type { ConceptNode, ConceptLink } from '../data/concepts';

export function ManageConcepts() {
  const [concepts, setConcepts] = useState<ConceptNode[]>([]);
  const [links, setLinks] = useState<ConceptLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [newConcept, setNewConcept] = useState<Partial<ConceptNode>>({
    id: '',
    name: '',
    description: '',
    category: 'math',
  });
  const [newLink, setNewLink] = useState<Partial<ConceptLink>>({
    source: '',
    target: '',
  });
  const toast = useToast();

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
      toast({
        title: 'Error',
        description: 'Failed to load data',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddConcept = async () => {
    try {
      if (!newConcept.id || !newConcept.name || !newConcept.description || !newConcept.category) {
        throw new Error('All fields are required');
      }
      await dbOperations.addConcept(newConcept as ConceptNode);
      setNewConcept({ id: '', name: '', description: '', category: 'math' });
      await loadData();
      toast({
        title: 'Concept added',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add concept',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleAddLink = async () => {
    try {
      if (!newLink.source || !newLink.target) {
        throw new Error('Both source and target are required');
      }
      await dbOperations.addLink(newLink as ConceptLink);
      setNewLink({ source: '', target: '' });
      await loadData();
      toast({
        title: 'Link added',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add link',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleRemoveConcept = async (id: string) => {
    try {
      await dbOperations.removeConcept(id);
      await loadData();
      toast({
        title: 'Concept removed',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to remove concept',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleRemoveLink = async (source: string, target: string) => {
    try {
      await dbOperations.removeLink(source, target);
      await loadData();
      toast({
        title: 'Link removed',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to remove link',
        status: 'error',
        duration: 3000,
      });
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
        {/* Add Concept Form */}
        <Box borderWidth={1} p={4} borderRadius="md">
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>ID</FormLabel>
              <Input
                value={newConcept.id}
                onChange={(e) => setNewConcept({ ...newConcept, id: e.target.value })}
                placeholder="unique-id"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={newConcept.name}
                onChange={(e) => setNewConcept({ ...newConcept, name: e.target.value })}
                placeholder="Concept Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={newConcept.description}
                onChange={(e) => setNewConcept({ ...newConcept, description: e.target.value })}
                placeholder="Concept Description"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                value={newConcept.category}
                onChange={(e) => setNewConcept({ ...newConcept, category: e.target.value as ConceptNode['category'] })}
              >
                <option value="math">Math</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
              </Select>
            </FormControl>
            <Button colorScheme="blue" onClick={handleAddConcept}>
              Add Concept
            </Button>
          </VStack>
        </Box>

        {/* Add Link Form */}
        <Box borderWidth={1} p={4} borderRadius="md">
          <VStack spacing={4}>
            <HStack spacing={4} width="100%">
              <FormControl>
                <FormLabel>Source</FormLabel>
                <Select
                  value={newLink.source}
                  onChange={(e) => setNewLink({ ...newLink, source: e.target.value })}
                >
                  <option value="">Select Source</option>
                  {concepts.map((concept) => (
                    <option key={concept.id} value={concept.id}>
                      {concept.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Target</FormLabel>
                <Select
                  value={newLink.target}
                  onChange={(e) => setNewLink({ ...newLink, target: e.target.value })}
                >
                  <option value="">Select Target</option>
                  {concepts.map((concept) => (
                    <option key={concept.id} value={concept.id}>
                      {concept.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>
            <Button colorScheme="blue" onClick={handleAddLink}>
              Add Link
            </Button>
          </VStack>
        </Box>

        {/* Concepts Table */}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {concepts.map((concept) => (
              <Tr key={concept.id}>
                <Td>{concept.id}</Td>
                <Td>{concept.name}</Td>
                <Td>{concept.category}</Td>
                <Td>
                  <IconButton
                    aria-label="Delete concept"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemoveConcept(concept.id)}
                  />
                </Td>
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
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {links.map((link) => (
              <Tr key={`${link.source}-${link.target}`}>
                <Td>{concepts.find((c) => c.id === link.source)?.name || link.source}</Td>
                <Td>{concepts.find((c) => c.id === link.target)?.name || link.target}</Td>
                <Td>
                  <IconButton
                    aria-label="Delete link"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemoveLink(link.source, link.target)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
} 