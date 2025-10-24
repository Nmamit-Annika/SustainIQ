"use client"

interface FoodStepProps {
  formData: any
  setFormData: (data: any) => void
}

export default function FoodStep({ formData, setFormData }: FoodStepProps) {
  const handleChange = (key: string, value: number) => {
    setFormData({
      ...formData,
      food: {
        ...formData.food,
        [key]: value,
      },
    })
  }

  const items = [
    { key: "beef", label: "Beef (kg/week)", placeholder: "e.g., 2" },
    { key: "chicken", label: "Chicken (kg/week)", placeholder: "e.g., 1.5" },
    { key: "fish", label: "Fish (kg/week)", placeholder: "e.g., 1" },
    { key: "vegetables", label: "Vegetables (kg/week)", placeholder: "e.g., 5" },
    { key: "dairy", label: "Dairy (kg/week)", placeholder: "e.g., 3" },
  ]

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.key}>
          <label className="block text-sm font-medium text-foreground mb-2">{item.label}</label>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder={item.placeholder}
            value={formData.food[item.key] || ""}
            onChange={(e) => handleChange(item.key, Number.parseFloat(e.target.value) || 0)}
            className="input-field"
          />
        </div>
      ))}
    </div>
  )
}
