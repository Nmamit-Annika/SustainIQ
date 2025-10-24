"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface RadialChartProps {
  data: Array<{ name: string; value: number }>
}

export default function RadialChart({ data }: RadialChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return

    const width = 400
    const height = 400
    const innerRadius = 60
    const outerRadius = Math.min(width, height) / 2 - 40

    const colors = ["#2d7d4d", "#4a9d6f", "#e8b44f", "#f5d17a", "#d4cfc8"]

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`)

    const angleSlice = (Math.PI * 2) / data.length
    const maxValue = Math.max(...data.map((d) => d.value))
    const rScale = d3.scaleLinear().domain([0, maxValue]).range([innerRadius, outerRadius])

    g.selectAll(".grid-line")
      .data(d3.range(0, maxValue, maxValue / 4))
      .enter()
      .append("circle")
      .attr("class", "grid-line")
      .attr("r", (d) => rScale(d))
      .attr("fill", "none")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,4")

    g.selectAll(".axis-line")
      .data(data)
      .enter()
      .append("line")
      .attr("class", "axis-line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1)

    const radarLine = d3
      .lineRadial<any>()
      .angle((d, i) => angleSlice * i - Math.PI / 2)
      .radius((d) => rScale(d.value))

    g.append("path")
      .datum(data)
      .attr("d", radarLine)
      .attr("fill", colors[0])
      .attr("fill-opacity", 0.25)
      .attr("stroke", colors[0])
      .attr("stroke-width", 2)

    g.selectAll(".data-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("r", 5)
      .attr("fill", colors[0])
      .style("cursor", "pointer")
      .on("mouseover", function () {
        d3.select(this).transition().duration(200).attr("r", 8).attr("fill", colors[1])
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("r", 5).attr("fill", colors[0])
      })

    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d, i) => (rScale(maxValue) + 30) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => (rScale(maxValue) + 30) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#556b7d")
      .text((d) => d.name)
  }, [data])

  return <svg ref={svgRef} className="w-full" />
}
