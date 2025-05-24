import { concepts, conceptLinks } from './data';
import type { ConceptNode, ConceptLink } from './concepts';

let db: IDBDatabase;
const DB_NAME = 'conceptsDB';
const CONCEPTS_STORE = 'concepts';
const LINKS_STORE = 'links';

// Initialize IndexedDB
const dbInit = new Promise<void>((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, 1);

  request.onerror = () => reject(request.error);
  
  request.onsuccess = () => {
    db = request.result;
    resolve();
  };

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;
    
    if (!db.objectStoreNames.contains(CONCEPTS_STORE)) {
      db.createObjectStore(CONCEPTS_STORE, { keyPath: 'id' });
    }
    
    if (!db.objectStoreNames.contains(LINKS_STORE)) {
      const linkStore = db.createObjectStore(LINKS_STORE, { keyPath: ['source', 'target'] });
      linkStore.createIndex('by_source', 'source');
      linkStore.createIndex('by_target', 'target');
    }
  };
});

// Initialize with sample data
const initSampleData = async () => {
  console.log('Initializing sample data...');
  
  // Check if data exists
  const conceptStore = db.transaction(CONCEPTS_STORE, 'readonly').objectStore(CONCEPTS_STORE);
  const countRequest = conceptStore.count();
  const count = await new Promise<number>((resolve) => {
    countRequest.onsuccess = () => resolve(countRequest.result);
  });

  if (count === 0) {
    console.log('No existing data, adding sample data...');
    
    // Add concepts
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(CONCEPTS_STORE, 'readwrite');
      const store = transaction.objectStore(CONCEPTS_STORE);
      
      concepts.forEach(concept => {
        console.log('Adding concept:', concept);
        store.add(concept);
      });
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });

    // Add links
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(LINKS_STORE, 'readwrite');
      const store = transaction.objectStore(LINKS_STORE);
      
      conceptLinks.forEach(link => {
        console.log('Adding link:', link);
        store.add(link);
      });
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });

    console.log('Sample data initialization complete');
  } else {
    console.log('Data already exists, skipping initialization');
  }
};

// Initialize database and sample data
dbInit.then(initSampleData).catch(console.error);

// Database operations
export const dbOperations = {
  getAllConcepts: async (): Promise<ConceptNode[]> => {
    await dbInit;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(CONCEPTS_STORE, 'readonly');
      const store = transaction.objectStore(CONCEPTS_STORE);
      const request = store.getAll();
      
      request.onsuccess = () => {
        console.log('Retrieved concepts:', request.result);
        resolve(request.result);
      };
      request.onerror = () => reject(request.error);
    });
  },

  getAllLinks: async (): Promise<ConceptLink[]> => {
    await dbInit;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(LINKS_STORE, 'readonly');
      const store = transaction.objectStore(LINKS_STORE);
      const request = store.getAll();
      
      request.onsuccess = () => {
        console.log('Retrieved links:', request.result);
        resolve(request.result);
      };
      request.onerror = () => reject(request.error);
    });
  },

  addConcept: async (concept: ConceptNode): Promise<void> => {
    await dbInit;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(CONCEPTS_STORE, 'readwrite');
      const store = transaction.objectStore(CONCEPTS_STORE);
      const request = store.add(concept);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  removeConcept: async (id: string): Promise<void> => {
    await dbInit;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CONCEPTS_STORE, LINKS_STORE], 'readwrite');
      const conceptStore = transaction.objectStore(CONCEPTS_STORE);
      const linkStore = transaction.objectStore(LINKS_STORE);
      
      // Delete the concept
      conceptStore.delete(id);
      
      // Delete related links
      const sourceIndex = linkStore.index('by_source');
      const targetIndex = linkStore.index('by_target');
      
      sourceIndex.openCursor(id).onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
      
      targetIndex.openCursor(id).onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  },

  addLink: async (link: ConceptLink): Promise<void> => {
    await dbInit;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(LINKS_STORE, 'readwrite');
      const store = transaction.objectStore(LINKS_STORE);
      const request = store.add(link);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  removeLink: async (source: string, target: string): Promise<void> => {
    await dbInit;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(LINKS_STORE, 'readwrite');
      const store = transaction.objectStore(LINKS_STORE);
      const request = store.delete([source, target]);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}; 