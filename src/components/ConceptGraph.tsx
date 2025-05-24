import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { ConceptNode } from '../data/concepts';
import { dbOperations } from '../data/db';
import { Box, Spinner, Center } from '@chakra-ui/react';

interface ConceptGraphProps {
  onNodeClick: (concept: ConceptNode) => void;
}

interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  description: string;
  category: 'math' | 'physics' | 'chemistry';
  x?: number;
  y?: number;
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  source: string;
  target: string;
}

export const ConceptGraph = ({ onNodeClick }: ConceptGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [concepts, setConcepts] = useState<ConceptNode[]>([]);
  const [conceptLinks, setConceptLinks] = useState<SimLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedConcepts, loadedLinks] = await Promise.all([
          dbOperations.getAllConcepts(),
          dbOperations.getAllLinks()
        ]);
        console.log('Loaded concepts:', loadedConcepts);
        console.log('Loaded links:', loadedLinks);
        setConcepts(loadedConcepts);
        setConceptLinks(loadedLinks);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!svgRef.current || concepts.length === 0) {
      console.log('No concepts or SVG ref not ready');
      return;
    }

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const width = window.innerWidth;
    const height = window.innerHeight - 100;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create a group for the graph
    const g = svg.append('g');

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>();
    zoom.scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create the force simulation
    const simulation = d3.forceSimulation<SimNode>(concepts as SimNode[])
      .force('link', d3.forceLink<SimNode, SimLink>(conceptLinks as SimLink[]).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(80));

    // Create the links
    const links = g.selectAll('.link')
      .data(conceptLinks)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', 2);

    // Create color scale for categories
    const colorScale = d3.scaleOrdinal<string>()
      .domain(['math', 'physics', 'chemistry'])
      .range(['#4299E1', '#48BB78', '#F56565']);

    // Create the nodes
    const nodes = g.selectAll('.node')
      .data(concepts)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .on('click', (_, d) => onNodeClick(d));

    // Add circles to nodes
    nodes.append('circle')
      .attr('r', 40)
      .style('fill', (d: ConceptNode) => colorScale(d.category))
      .style('stroke', '#fff')
      .style('stroke-width', 2);

    // Add labels to nodes
    nodes.append('text')
      .text((d: ConceptNode) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .style('fill', 'white')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .call(wrap, 70);

    // Update positions on each tick
    simulation.on('tick', () => {
      links
        .attr('x1', d => ((d.source as unknown) as SimNode).x || 0)
        .attr('y1', d => ((d.source as unknown) as SimNode).y || 0)
        .attr('x2', d => ((d.target as unknown) as SimNode).x || 0)
        .attr('y2', d => ((d.target as unknown) as SimNode).y || 0);

      nodes.attr('transform', d => `translate(${(d as SimNode).x || 0},${(d as SimNode).y || 0})`);
    });

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - 100;
      svg.attr('width', width).attr('height', height);
      simulation.force('center', d3.forceCenter(width / 2, height / 2));
      simulation.alpha(0.3).restart();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      simulation.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, [concepts, conceptLinks, onNodeClick]);

  if (loading) {
    return (
      <Center height="calc(100vh - 100px)">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box width="100%" height="calc(100vh - 100px)" position="relative" bg="white">
      <svg
        ref={svgRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </Box>
  );
};

// Helper function to wrap text
function wrap(text: d3.Selection<SVGTextElement, ConceptNode, SVGGElement, unknown>, width: number) {
  text.each(function() {
    const text = d3.select(this);
    const words = text.text().split(/\s+/).reverse();
    let word: string | undefined;
    let line: string[] = [];
    let lineNumber = 0;
    const lineHeight = 1.1;
    const y = text.attr('y');
    const dy = parseFloat(text.attr('dy'));
    let tspan = text.text('').append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');

    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(' '));
      if ((tspan.node()?.getComputedTextLength() || 0) > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
      }
    }
  });
} 