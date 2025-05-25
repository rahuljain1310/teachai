import type { ConceptNode, ConceptLink } from './concepts';

// Default empty data
const defaultData = {
  concepts: [] as ConceptNode[],
  conceptLinks: [] as ConceptLink[]
};

// Load data from JSON files
async function loadData() {
  try {
    const conceptsResponse = await fetch('/src/data/concepts.json');
    const linksResponse = await fetch('/src/data/links.json');
    const conceptsData = await conceptsResponse.json();
    const linksData = await linksResponse.json();
    return { 
      concepts: conceptsData.concepts as ConceptNode[],
      conceptLinks: linksData.conceptLinks as ConceptLink[]
    };
  } catch (error) {
    console.error('Error loading data from JSON files:', error);
    return defaultData;
  }
}

// Database operations
export const dbOperations = {
  getAllConcepts: async (): Promise<ConceptNode[]> => {
    const { concepts } = await loadData();
    console.log('Retrieved concepts:', concepts);
    return concepts;
  },

  getAllLinks: async (): Promise<ConceptLink[]> => {
    const { conceptLinks } = await loadData();
    console.log('Retrieved links:', conceptLinks);
    return conceptLinks;
  },

  addConcept: async (): Promise<void> => {
    console.warn('Adding concepts is not supported in read-only JSON mode');
  },

  removeConcept: async (): Promise<void> => {
    console.warn('Removing concepts is not supported in read-only JSON mode');
  },

  addLink: async (): Promise<void> => {
    console.warn('Adding links is not supported in read-only JSON mode');
  },

  removeLink: async (): Promise<void> => {
    console.warn('Removing links is not supported in read-only JSON mode');
  },

  clearDatabase: async (): Promise<void> => {
    console.warn('Clearing database is not supported in read-only JSON mode');
  }
}; 