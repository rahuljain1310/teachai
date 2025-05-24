import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ConceptGraph } from './components/ConceptGraph'
import { ConceptModal } from './components/ConceptModal'
import { ManageConcepts } from './components/ManageConcepts'
import { Button, HStack } from '@chakra-ui/react'
import type { ConceptNode } from './data/concepts'

function App() {
  return (
    <Router>      
      <Box h="100vh" bg="gray.50">
        <HStack p={4} spacing={4} bg="white" shadow="sm">
          <Link to="/">
            <Button variant="ghost">View Graph</Button>
          </Link>
          <Link to="/manage">
            <Button variant="ghost">Manage Concepts</Button>
          </Link>
        </HStack>
        
        <Routes>
          <Route path="/" element={<GraphView />} />
          <Route path="/manage" element={<ManageConcepts />} />
        </Routes>
      </Box>
    </Router>
  )
}

function GraphView() {
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode | null>(null)

  return (
    <>
      <ConceptGraph onNodeClick={setSelectedConcept} />
      <ConceptModal
        isOpen={selectedConcept !== null}
        onClose={() => setSelectedConcept(null)}
        concept={selectedConcept}
      />
    </>
  )
}

export default App
