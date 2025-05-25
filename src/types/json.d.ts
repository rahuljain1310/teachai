import type { ConceptNode, ConceptLink } from '../data/concepts';

declare module '*.json' {
  const value: {
    concepts?: ConceptNode[];
    conceptLinks?: ConceptLink[];
  };
  export default value;
} 