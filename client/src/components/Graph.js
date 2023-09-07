import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { zoom } from "d3-zoom";

function Graph({ data, onClick }) {
  const svgRef = useRef();

  const root = d3.hierarchy(data);

  const [animatedNodes, setAnimatedNodes] = useState([]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5]) // Set the minimum and maximum zoom level
      .on("zoom", handleZoom);

    svg.call(zoomBehavior);
    function handleZoom(e) {
      // Get the zoom transform
      const transform = e.transform;

      // Apply the zoom transform to the elements you want to zoom
      svg.selectAll("circle").attr("transform", transform);
      svg.selectAll("text").attr("transform", transform);
    }

    const sim = d3
      .forceSimulation()
      .force("radial", d3.forceRadial(150, origin.x, origin.y))
      .force("collide", d3.forceCollide(150));

    sim.on("tick", () => {
      setAnimatedNodes([...sim.nodes()]);
    });

    sim.nodes(root.children);
    sim.alpha(0.1).restart();
    console.log(animatedNodes);
    return () => sim.stop();
  }, [data]);

  const handleClick = (node) => {
    console.log(node.data.link);
    onClick(node.data.link);
  }
  

  return (
    <svg
      ref={svgRef}
      width={"50vw"}
      height={"100vh"}
      viewBox="-500 -500 1000 1000"
    >
      <g>
        {animatedNodes.map((node) => (
          <g onClick={() => handleClick(node)}>
            <circle
                r={node.children ? Math.min(node.children.length, 30) : 5}
                cx={node.x}
                cy={node.y}
                fill="white"
                stroke="black"
              />

              <text
                x={node.x + 10 + (node.children ? Math.min(node.children.length, 30) : 5)}
                y={node.y + 5}
                textAnchor="right"
                style={{userSelect: "none"}}
                >
                {node.data.content}
              </text>
              
            
          </g>
        ))}
      </g>
    </svg>
  );
}

export default Graph;
