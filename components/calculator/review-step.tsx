"use client"

import { useRouter } from "next/navigation"
import { saveCarbonEntry } from "@/lib/carbon-calculator"
import { CheckCircle } from "lucide-react"

interface ReviewStepProps {
  formData: any
  setFormData: (data: any) => void
}

export default function ReviewStep({ formData, setFormData }: ReviewStepProps) {
  const router = useRouter()

  const calculateTotal = () => {
    let total = 0

    // Transportation
    total += formData.transportation.car * 0.192
    total += formData.transportation.bus * 0.089
    total += formData.transportation.train * 0.041
    total += formData.transportation.flight * 0.255

    // Energy
    total += formData.energy.electricity * 0.233
    total += formData.energy.naturalGas * 2.04
    total += formData.energy.heating * 0.206

    // Food
    total += formData.food.beef * 27.0
    total += formData.food.chicken * 6.9
    total += formData.food.fish * 12.0
    total += formData.food.vegetables * 2.0
    total += formData.food.dairy * 1.23

    // Waste
    total += formData.waste.plastic * 6.0
    total += formData.waste.paper * 1.5
    total += formData.waste.organic * 0.5

    return total
  }

  const handleSubmit = () => {
    const total = calculateTotal()
    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      category: "Overall",
      subcategory: "Carbon Footprint",
      value: 1,
      unit: "entry",
      emissions: total,
    }

    saveCarbonEntry(entry)
    router.push("/dashboard")
  }

  const total = calculateTotal()

  return (
    <div className="space-y-8">
      <div className="bg-primary/5 border-2 border-primary rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-primary" size={48} />
        </div>
        <p className="text-slate-600 mb-2">Your Total Carbon Footprint</p>
        <p className="text-5xl font-bold text-primary">{total.toFixed(2)}</p>
        <p className="text-slate-600 mt-2">kg CO₂ per period</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-100 p-4 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">Transportation</p>
          <p className="text-2xl font-bold text-foreground">
            {(
              formData.transportation.car * 0.192 +
              formData.transportation.bus * 0.089 +
              formData.transportation.train * 0.041 +
              formData.transportation.flight * 0.255
            ).toFixed(1)}
          </p>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">Energy</p>
          <p className="text-2xl font-bold text-foreground">
            {(
              formData.energy.electricity * 0.233 +
              formData.energy.naturalGas * 2.04 +
              formData.energy.heating * 0.206
            ).toFixed(1)}
          </p>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">Food</p>
          <p className="text-2xl font-bold text-foreground">
            {(
              formData.food.beef * 27.0 +
              formData.food.chicken * 6.9 +
              formData.food.fish * 12.0 +
              formData.food.vegetables * 2.0 +
              formData.food.dairy * 1.23
            ).toFixed(1)}
          </p>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">Waste</p>
          <p className="text-2xl font-bold text-foreground">
            {(formData.waste.plastic * 6.0 + formData.waste.paper * 1.5 + formData.waste.organic * 0.5).toFixed(1)}
          </p>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Save & View Dashboard
      </button>
    </div>
  )
}
