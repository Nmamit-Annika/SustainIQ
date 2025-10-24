"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface PieChartProps {
  data: Array<{ name: string; value: number }>
}

export default function PieChart({ data }: PieChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return

    const width = 400
    const height = 300
    const radius = Math.min(width, height) / 2 - 20

    const colors = ["#2d7d4d", "#4a9d6f", "#e8b44f", "#f5d17a", "#d4cfc8"]

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`)

    const pie = d3.pie<any>().value((d) => d.value)
    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius)

    const arcs = g.selectAll("arc").data(pie(data)).enter().append("g")

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors[i % colors.length])
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("opacity", 0.8)
      .on("mouseover", function () {
        d3.select(this).style("opacity", 1)
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.8)
      })

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .text((d) => `${((d.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%`)
  }, [data])

  return <svg ref={svgRef} className="w-full" />
}
