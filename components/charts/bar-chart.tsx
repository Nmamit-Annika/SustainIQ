"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface BarChartProps {
  data: Array<{ name: string; value: number }>
}

export default function BarChart({ data }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return

    const width = 400
    const height = 300
    const margin = { top: 20, right: 20, bottom: 60, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1)

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data.map((d) => d.value))])
      .range([innerHeight, 0])

    const color = "#2d7d4d"

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.name) || 0)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("fill", color)
      .style("opacity", 0.8)
      .on("mouseover", function () {
        d3.select(this).style("opacity", 1)
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.8)
      })

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("font-size", "12px")

    g.append("g").call(d3.axisLeft(yScale)).attr("font-size", "12px")
  }, [data])

  return <svg ref={svgRef} className="w-full" />
}
