"use client"

import * as React from "react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Sparkles } from "lucide-react"

interface Calendar05Props {
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  currentMonth: Date
  onMonthChange: (date: Date) => void
}

export function Calendar05({
  selected,
  onSelect,
  currentMonth,
  onMonthChange,
}: Calendar05Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Only manage dateRange here, not month
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(selected)

  React.useEffect(() => {
    setDateRange(selected)
  }, [selected])

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range)
    onSelect?.(range)
  }

  const formatDate = (date?: Date) =>
    date
      ? date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Select date"

  const nights = React.useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return 0
    const diff =
      (dateRange.to.getTime() - dateRange.from.getTime()) /
      (1000 * 60 * 60 * 24)
    return Math.max(Math.floor(diff), 0)
  }, [dateRange])

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-4 p-4 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-xl border border-emerald-100 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <CalendarDays className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            Select Your Dates
          </h3>
          {nights > 0 && (
            <span className="ml-auto px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm font-semibold text-gray-500 uppercase mb-1">
              Check-in
            </div>
            <div className="text-sm font-bold text-gray-900">
              {formatDate(dateRange?.from)}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm font-semibold text-gray-500 uppercase mb-1">
              Check-out
            </div>
            <div className="text-sm font-bold text-gray-900">
              {formatDate(dateRange?.to)}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <Calendar
        mode="range"
        month={currentMonth}          // controlled from parent
        onMonthChange={onMonthChange} // controlled from parent
        pagedNavigation
        selected={dateRange}
        onSelect={handleSelect}
        numberOfMonths={2}
        disabled={{ before: today }}
        className="rounded-xl border-2 border-gray-100 shadow-lg bg-white p-5"
      />
    </div>
  )
}
