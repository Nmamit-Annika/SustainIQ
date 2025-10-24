"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface DonutChartProps {
  data: Array<{ name: string; value: number }>
}

export default function DonutChart({ data }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return

    const width = 400
    const height = 350
    const radius = Math.min(width, height) / 2 - 30

    const colors = ["#2d7d4d", "#4a9d6f", "#e8b44f", "#f5d17a", "#d4cfc8", "#a8d5ba"]

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`)

    const pie = d3.pie<any>().value((d) => d.value)
    const arc = d3
      .arc<any>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)

    const arcs = g.selectAll("arc").data(pie(data)).enter().append("g").attr("class", "arc")

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors[i % colors.length])
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .style("opacity", 0.85)
      .style("cursor", "pointer")
      .on("mouseover", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .attr("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.15))")
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).style("opacity", 0.85).attr("filter", "none")
      })

    arcs
      .append("text")
      .attr("transform", (d) => {
        const pos = arc.centroid(d)
        const midAngle = (d.startAngle + d.endAngle) / 2
        const x = Math.cos(midAngle - Math.PI / 2) * (radius * 0.75)
        const y = Math.sin(midAngle - Math.PI / 2) * (radius * 0.75)
        return `translate(${x},${y})`
      })
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("font-size", "13px")
      .text((d) => {
        const total = data.reduce((sum, item) => sum + item.value, 0)
        const percent = ((d.value / total) * 100).toFixed(0)
        return `${percent}%`
      })

    const legend = svg.append("g").attr("transform", `translate(${-width / 2 + 20},${height / 2 - 60})`)

    legend
      .selectAll(".legend-item")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0,${i * 20})`)
      .each(function (d, i) {
        d3.select(this)
          .append("rect")
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", colors[i % colors.length])
          .attr("rx", 2)

        d3.select(this)
          .append("text")
          .attr("x", 18)
          .attr("y", 10)
          .attr("font-size", "12px")
          .attr("fill", "#556b7d")
          .text(`${d.name}: ${d.value.toFixed(1)} kg`)
      })
  }, [data])

  return <svg ref={svgRef} className="w-full" />
}
