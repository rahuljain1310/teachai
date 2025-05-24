import { generateKnowledgeGraph } from './generate_knowledge_graph.js';
import fs from 'fs/promises';
import path from 'path';

async function updateDatabase() {
  try {
    const { concepts, conceptLinks } = generateKnowledgeGraph();
    
    // Write to JSON files
    const dataDir = path.join(process.cwd(), 'src', 'data');
    
    // Write concepts
    await fs.writeFile(
      path.join(dataDir, 'concepts.json'),
      JSON.stringify({ concepts }, null, 2)
    );
    console.log('Concepts written to file');

    // Write links
    await fs.writeFile(
      path.join(dataDir, 'links.json'),
      JSON.stringify({ conceptLinks }, null, 2)
    );
    console.log('Links written to file');

    console.log('Database update completed successfully');
  } catch (error) {
    console.error('Error updating database:', error);
  }
}

// Run the update if this script is executed directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  updateDatabase();
} 