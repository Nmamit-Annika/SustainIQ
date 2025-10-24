// Carbon emission factors (kg CO2 per unit)
export const EMISSION_FACTORS = {
  // Transportation (per km)
  car: 0.192,
  bus: 0.089,
  train: 0.041,
  flight: 0.255,

  // Energy (per kWh)
  electricity: 0.233,
  naturalGas: 2.04,
  heating: 0.206,

  // Food (per kg)
  beef: 27.0,
  chicken: 6.9,
  fish: 12.0,
  vegetables: 2.0,
  dairy: 1.23,

  // Waste (per kg)
  plastic: 6.0,
  paper: 1.5,
  organic: 0.5,
}

export interface CarbonEntry {
  id: string
  date: string
  category: string
  subcategory: string
  value: number
  unit: string
  emissions: number
  notes?: string
}

export interface CarbonData {
  entries: CarbonEntry[]
  totalEmissions: number
  lastUpdated: string
}

export function calculateEmissions(category: string, subcategory: string, value: number): number {
  const key = subcategory.toLowerCase().replace(/\s+/g, "")
  const factor = EMISSION_FACTORS[key as keyof typeof EMISSION_FACTORS] || 0
  return value * factor
}

export function getCarbonData(): CarbonData {
  if (typeof window === "undefined") {
    return { entries: [], totalEmissions: 0, lastUpdated: new Date().toISOString() }
  }

  const stored = localStorage.getItem("carbonData")
  if (!stored) {
    return { entries: [], totalEmissions: 0, lastUpdated: new Date().toISOString() }
  }

  return JSON.parse(stored)
}

export function saveCarbonEntry(entry: CarbonEntry): void {
  const data = getCarbonData()
  data.entries.push(entry)
  data.totalEmissions = data.entries.reduce((sum, e) => sum + e.emissions, 0)
  data.lastUpdated = new Date().toISOString()
  localStorage.setItem("carbonData", JSON.stringify(data))
}

export function deleteCarbonEntry(id: string): void {
  const data = getCarbonData()
  data.entries = data.entries.filter((e) => e.id !== id)
  data.totalEmissions = data.entries.reduce((sum, e) => sum + e.emissions, 0)
  data.lastUpdated = new Date().toISOString()
  localStorage.setItem("carbonData", JSON.stringify(data))
}

export function getEmissionsByCategory(): Record<string, number> {
  const data = getCarbonData()
  const byCategory: Record<string, number> = {}

  data.entries.forEach((entry) => {
    byCategory[entry.category] = (byCategory[entry.category] || 0) + entry.emissions
  })

  return byCategory
}

export function getEmissionsTrend(): Array<{ date: string; emissions: number }> {
  const data = getCarbonData()
  const trend: Record<string, number> = {}

  data.entries.forEach((entry) => {
    const date = entry.date
    trend[date] = (trend[date] || 0) + entry.emissions
  })

  return Object.entries(trend)
    .map(([date, emissions]) => ({ date, emissions }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
