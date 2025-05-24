export interface ConceptNode {
  id: string;
  name: string;
  description: string;
  category: 'math' | 'physics' | 'chemistry';
}

export interface ConceptLink {
  source: string;
  target: string;
}

