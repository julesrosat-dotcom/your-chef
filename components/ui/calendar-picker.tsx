'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
  getDay,
  isSameDay
} from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarPickerProps {
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
  multiSelect?: boolean;
}

export function CalendarPicker({ selectedDates, onDateSelect, multiSelect = false }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = getDay(monthStart);
  const emptyDays = Array.from({ length: startDayOfWeek === 0 ? 6 : startDayOfWeek - 1 }, (_, i) => i);

  const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    if (isBefore(date, today)) return;
    onDateSelect(date);
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.some(selectedDate => isSameDay(selectedDate, date));
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, today);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h3 className="text-xl font-semibold text-gray-900 capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {daysInMonth.map((day) => {
          const isSelected = isDateSelected(day);
          const isDisabled = isDateDisabled(day);
          const isTodayDate = isToday(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
              type="button"
              className={`
                aspect-square p-2 text-sm rounded-lg transition-all
                ${isDisabled
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'hover:bg-orange-50 cursor-pointer'
                }
                ${isSelected
                  ? 'bg-orange-500 text-white hover:bg-orange-600 font-semibold'
                  : ''
                }
                ${isTodayDate && !isSelected
                  ? 'font-bold border-2 border-orange-500 text-orange-500'
                  : ''
                }
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>

      {multiSelect && selectedDates.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            {selectedDates.length} date{selectedDates.length > 1 ? 's' : ''} sélectionnée{selectedDates.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
