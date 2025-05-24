import type { ConceptNode, ConceptLink } from '../src/data/concepts';

const concepts: ConceptNode[] = [
  // Mathematics
  {
    id: "algebra",
    name: "Algebra",
    description: "Study of mathematical symbols and rules for manipulating these symbols",
    category: "math"
  },
  {
    id: "equations",
    name: "Equations",
    description: "Mathematical statements that assert the equality of two expressions",
    category: "math"
  },
  {
    id: "polynomials",
    name: "Polynomials",
    description: "Expressions consisting of variables and coefficients",
    category: "math"
  },
  {
    id: "matrices",
    name: "Matrices",
    description: "Rectangular arrays of numbers used in linear algebra",
    category: "math"
  },
  {
    id: "calculus",
    name: "Calculus",
    description: "Study of continuous change, including derivatives and integrals",
    category: "math"
  },
  {
    id: "derivatives",
    name: "Derivatives",
    description: "Rate of change of a function with respect to a variable",
    category: "math"
  },
  {
    id: "integrals",
    name: "Integrals",
    description: "Measurement of the area under a curve",
    category: "math"
  },
  {
    id: "limits",
    name: "Limits",
    description: "Value a function approaches as input approaches a certain value",
    category: "math"
  },
  {
    id: "geometry",
    name: "Geometry",
    description: "Study of shapes, sizes, positions, and dimensions",
    category: "math"
  },
  {
    id: "polygons",
    name: "Polygons",
    description: "Closed shapes with straight sides",
    category: "math"
  },
  {
    id: "circles",
    name: "Circles",
    description: "Set of points equidistant from a center point",
    category: "math"
  },
  {
    id: "trigonometry",
    name: "Trigonometry",
    description: "Study of relationships between sides and angles of triangles",
    category: "math"
  },
  {
    id: "sine_cosine",
    name: "Sine & Cosine",
    description: "Basic trigonometric functions relating angles to ratios of sides",
    category: "math"
  },
  {
    id: "statistics",
    name: "Statistics",
    description: "Study of collecting, analyzing, and interpreting data",
    category: "math"
  },
  {
    id: "probability",
    name: "Probability",
    description: "Study of likelihood and uncertainty of events",
    category: "math"
  },
  {
    id: "linear_algebra",
    name: "Linear Algebra",
    description: "Study of linear equations and linear functions",
    category: "math"
  },

  // Physics
  {
    id: "mechanics",
    name: "Mechanics",
    description: "Study of motion and forces acting on objects",
    category: "physics"
  },
  {
    id: "kinematics",
    name: "Kinematics",
    description: "Study of motion without considering forces",
    category: "physics"
  },
  {
    id: "dynamics",
    name: "Dynamics",
    description: "Study of forces and their effects on motion",
    category: "physics"
  },
  {
    id: "thermodynamics",
    name: "Thermodynamics",
    description: "Study of heat, energy, and their relationships",
    category: "physics"
  },
  {
    id: "heat_transfer",
    name: "Heat Transfer",
    description: "Study of thermal energy movement between systems",
    category: "physics"
  },
  {
    id: "entropy",
    name: "Entropy",
    description: "Measure of disorder in a thermodynamic system",
    category: "physics"
  },
  {
    id: "electromagnetism",
    name: "Electromagnetism",
    description: "Study of electrical and magnetic phenomena",
    category: "physics"
  },
  {
    id: "electric_fields",
    name: "Electric Fields",
    description: "Region where electric forces act on charged particles",
    category: "physics"
  },
  {
    id: "magnetic_fields",
    name: "Magnetic Fields",
    description: "Region where magnetic forces act on moving charges",
    category: "physics"
  },
  {
    id: "quantum_mechanics",
    name: "Quantum Mechanics",
    description: "Study of matter and energy at the atomic scale",
    category: "physics"
  },
  {
    id: "wave_functions",
    name: "Wave Functions",
    description: "Mathematical descriptions of quantum states",
    category: "physics"
  },
  {
    id: "uncertainty",
    name: "Uncertainty",
    description: "Fundamental limits on measurement precision",
    category: "physics"
  },
  {
    id: "optics",
    name: "Optics",
    description: "Study of light and its behavior",
    category: "physics"
  },
  {
    id: "reflection",
    name: "Reflection",
    description: "Change in direction of light at an interface",
    category: "physics"
  },
  {
    id: "refraction",
    name: "Refraction",
    description: "Bending of light as it passes through media",
    category: "physics"
  },
  {
    id: "relativity",
    name: "Relativity",
    description: "Study of space, time, and gravity",
    category: "physics"
  },

  // Chemistry
  {
    id: "atomic_structure",
    name: "Atomic Structure",
    description: "Study of atoms and their components",
    category: "chemistry"
  },
  {
    id: "electron_config",
    name: "Electron Configuration",
    description: "Arrangement of electrons in atomic orbitals",
    category: "chemistry"
  },
  {
    id: "nuclear_chemistry",
    name: "Nuclear Chemistry",
    description: "Study of atomic nuclei and radioactivity",
    category: "chemistry"
  },
  {
    id: "chemical_bonding",
    name: "Chemical Bonding",
    description: "Study of how atoms combine to form molecules",
    category: "chemistry"
  },
  {
    id: "covalent_bonds",
    name: "Covalent Bonds",
    description: "Sharing of electrons between atoms",
    category: "chemistry"
  },
  {
    id: "ionic_bonds",
    name: "Ionic Bonds",
    description: "Transfer of electrons between atoms",
    category: "chemistry"
  },
  {
    id: "thermochemistry",
    name: "Thermochemistry",
    description: "Study of heat in chemical reactions",
    category: "chemistry"
  },
  {
    id: "reaction_kinetics",
    name: "Reaction Kinetics",
    description: "Study of rates of chemical reactions",
    category: "chemistry"
  },
  {
    id: "organic_chemistry",
    name: "Organic Chemistry",
    description: "Study of carbon-based compounds",
    category: "chemistry"
  },
  {
    id: "functional_groups",
    name: "Functional Groups",
    description: "Groups of atoms that give molecules characteristics",
    category: "chemistry"
  },
  {
    id: "stereochemistry",
    name: "Stereochemistry",
    description: "Study of spatial arrangement of atoms in molecules",
    category: "chemistry"
  },
  {
    id: "inorganic_chemistry",
    name: "Inorganic Chemistry",
    description: "Study of non-carbon-based compounds",
    category: "chemistry"
  },
  {
    id: "coordination_chemistry",
    name: "Coordination Chemistry",
    description: "Study of metal complexes with ligands",
    category: "chemistry"
  },
  {
    id: "biochemistry",
    name: "Biochemistry",
    description: "Study of chemical processes in living organisms",
    category: "chemistry"
  },
  {
    id: "metabolism",
    name: "Metabolism",
    description: "Chemical processes for maintaining life",
    category: "chemistry"
  },
  {
    id: "enzymes",
    name: "Enzymes",
    description: "Proteins that catalyze biochemical reactions",
    category: "chemistry"
  }
];

const conceptLinks: ConceptLink[] = [
  // Math relationships - Basic to Advanced
  { source: "equations", target: "algebra" },
  { source: "algebra", target: "polynomials" },
  { source: "algebra", target: "matrices" },
  { source: "matrices", target: "linear_algebra" },
  { source: "algebra", target: "calculus" },
  { source: "limits", target: "derivatives" },
  { source: "derivatives", target: "integrals" },
  { source: "polygons", target: "geometry" },
  { source: "circles", target: "geometry" },
  { source: "geometry", target: "trigonometry" },
  { source: "trigonometry", target: "sine_cosine" },
  { source: "probability", target: "statistics" },
  { source: "linear_algebra", target: "quantum_mechanics" },
  { source: "statistics", target: "thermodynamics" },

  // Physics relationships - Foundation to Advanced
  { source: "kinematics", target: "mechanics" },
  { source: "mechanics", target: "dynamics" },
  { source: "mechanics", target: "thermodynamics" },
  { source: "heat_transfer", target: "thermodynamics" },
  { source: "thermodynamics", target: "entropy" },
  { source: "electric_fields", target: "electromagnetism" },
  { source: "magnetic_fields", target: "electromagnetism" },
  { source: "electromagnetism", target: "optics" },
  { source: "reflection", target: "optics" },
  { source: "refraction", target: "optics" },
  { source: "optics", target: "quantum_mechanics" },
  { source: "wave_functions", target: "quantum_mechanics" },
  { source: "uncertainty", target: "quantum_mechanics" },
  { source: "mechanics", target: "relativity" },
  { source: "electromagnetism", target: "relativity" },

  // Chemistry relationships - Basic to Complex
  { source: "electron_config", target: "atomic_structure" },
  { source: "atomic_structure", target: "nuclear_chemistry" },
  { source: "atomic_structure", target: "chemical_bonding" },
  { source: "covalent_bonds", target: "chemical_bonding" },
  { source: "ionic_bonds", target: "chemical_bonding" },
  { source: "chemical_bonding", target: "organic_chemistry" },
  { source: "chemical_bonding", target: "inorganic_chemistry" },
  { source: "functional_groups", target: "organic_chemistry" },
  { source: "stereochemistry", target: "organic_chemistry" },
  { source: "coordination_chemistry", target: "inorganic_chemistry" },
  { source: "reaction_kinetics", target: "thermochemistry" },
  { source: "organic_chemistry", target: "biochemistry" },
  { source: "inorganic_chemistry", target: "biochemistry" },
  { source: "metabolism", target: "biochemistry" },
  { source: "enzymes", target: "biochemistry" },

  // Cross-disciplinary relationships - Prerequisites
  { source: "calculus", target: "kinematics" },
  { source: "linear_algebra", target: "wave_functions" },
  { source: "statistics", target: "reaction_kinetics" },
  { source: "thermodynamics", target: "reaction_kinetics" },
  { source: "quantum_mechanics", target: "electron_config" },
  { source: "electromagnetism", target: "chemical_bonding" }
];

// Function to export the data
export function generateKnowledgeGraph() {
  return { concepts, conceptLinks };
}

// If running this script directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  const graph = generateKnowledgeGraph();
  console.log(JSON.stringify(graph, null, 2));
} 