import type { ConceptNode, ConceptLink } from "./concepts";

export const concepts: ConceptNode[] = [
    {
      id: "algebra",
      name: "Algebra Basics",
      description: "Learn about variables, expressions, and solving linear equations. Master the fundamental building blocks of mathematics that allow us to represent real-world problems using symbols and numbers.",
      category: "math"
    },
    {
      id: "geometry",
      name: "Geometry",
      description: "Explore shapes, angles, and spatial relationships. Understand the properties of triangles, circles, and other geometric figures that surround us in everyday life.",
      category: "math"
    },
    {
      id: "trigonometry",
      name: "Trigonometry",
      description: "Study relationships between angles and sides of triangles. Learn sine, cosine, and tangent functions that are crucial for understanding waves and periodic motion.",
      category: "math"
    },
    {
      id: "newton_laws",
      name: "Newton's Laws",
      description: "Discover the fundamental laws of motion and forces that govern how objects move and interact with each other in the physical world.",
      category: "physics"
    },
    {
      id: "energy",
      name: "Energy & Work",
      description: "Understand different forms of energy, conservation of energy, and how work is related to energy transfer in physical systems.",
      category: "physics"
    },
    {
      id: "atomic_structure",
      name: "Atomic Structure",
      description: "Learn about the building blocks of matter, including protons, neutrons, and electrons, and how they combine to form atoms.",
      category: "chemistry"
    },
    {
      id: "chemical_bonding",
      name: "Chemical Bonding",
      description: "Explore how atoms combine to form molecules through different types of chemical bonds, including ionic and covalent bonds.",
      category: "chemistry"
    }
  ];
  
  export const conceptLinks: ConceptLink[] = [
    { source: "algebra", target: "trigonometry" },
    { source: "geometry", target: "trigonometry" },
    { source: "trigonometry", target: "newton_laws" },
    { source: "newton_laws", target: "energy" },
    { source: "atomic_structure", target: "chemical_bonding" }
  ]; 