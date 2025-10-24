"use client"

interface TransportationStepProps {
  formData: any
  setFormData: (data: any) => void
}

export default function TransportationStep({ formData, setFormData }: TransportationStepProps) {
  const handleChange = (key: string, value: number) => {
    setFormData({
      ...formData,
      transportation: {
        ...formData.transportation,
        [key]: value,
      },
    })
  }

  const modes = [
    { key: "car", label: "Car (km/week)", placeholder: "e.g., 50" },
    { key: "bus", label: "Bus (km/week)", placeholder: "e.g., 20" },
    { key: "train", label: "Train (km/week)", placeholder: "e.g., 10" },
    { key: "flight", label: "Flight (km/year)", placeholder: "e.g., 5000" },
  ]

  return (
    <div className="space-y-6">
      {modes.map((mode) => (
        <div key={mode.key}>
          <label className="block text-sm font-medium text-foreground mb-2">{mode.label}</label>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder={mode.placeholder}
            value={formData.transportation[mode.key] || ""}
            onChange={(e) => handleChange(mode.key, Number.parseFloat(e.target.value) || 0)}
            className="input-field"
          />
        </div>
      ))}
    </div>
  )
}
