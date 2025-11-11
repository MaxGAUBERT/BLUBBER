import { useState, useEffect } from "react"

function toEpochMs(v) {
  if (v == null) return null
  if (typeof v === "number") return v
  if (v instanceof Date) return v.getTime()
  if (typeof v === "string") {
    if (/^\d{2}:\d{2}$/.test(v)) {
      const [h, m] = v.split(":").map(Number)
      const d = new Date()
      d.setHours(h, m, 0, 0)
      return d.getTime()
    }
    const t = Date.parse(v)
    return Number.isNaN(t) ? null : t
  }
  return null
}

export default function useReminders(tasks) {
  const [hasReminder, setHasReminder] = useState(false)

  useEffect(() => {
    const checkReminders = () => {
      const now = Date.now()
      const due = tasks.some(t => {
        const ts = toEpochMs(t.callTime)
        return ts && now >= ts && now - ts < 60_000
      })
      setHasReminder(due)
    }

    checkReminders()          
    const id = setInterval(checkReminders, 15_000) 
    return () => clearInterval(id)
  }, [tasks])

  return hasReminder
}
