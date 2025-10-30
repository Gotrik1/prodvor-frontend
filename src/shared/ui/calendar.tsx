
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DropdownProps } from "react-day-picker"
import { ru } from 'date-fns/locale';

import { cn } from "@/shared/lib/utils"
import { buttonVariants } from "@/shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [isIos, setIsIos] = React.useState(false);

  React.useEffect(() => {
    // This check runs only on the client, where navigator is available.
    const isDeviceIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIos(isDeviceIos);
  }, []);

  const components = {
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        Dropdown: !isIos ? (({ value, onChange, children, ...props }: DropdownProps) => {
          const options = React.Children.toArray(children) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
          const selected = options.find((child) => child.props.value === value);
          const handleChange = (value: string) => {
            const event = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(event);
          };
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value);
              }}
            >
              <SelectTrigger className="pr-1.5 focus:ring-0 h-8 text-xs w-auto border-none shadow-none bg-transparent">
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {options.map((option, id: number) => (
                    <SelectItem
                        key={`${option.props.value}-${id}`}
                        value={option.props.value?.toString() ?? ""}
                    >
                        {option.props.children}
                    </SelectItem>
                    ))}
                </div>
              </SelectContent>
            </Select>
          );
        }) : undefined, // Use default dropdown on iOS
      };

  return (
    <DayPicker
      locale={ru}
      showOutsideDays={showOutsideDays}
      className={cn("p-3 rounded-md border shadow-main-sm", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden", // We hide the label now
        caption_dropdowns: "flex justify-center gap-1",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn("h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", 
          "[&:has([aria-selected].day-outside)]:bg-accent/50",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-transparent text-primary hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary focus:ring-2 focus:ring-primary/50",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        vhidden: "hidden",
        ...classNames,
      }}
      components={components}
      captionLayout="dropdown-buttons"
      fromYear={new Date().getFullYear() - 100}
      toYear={new Date().getFullYear() + 5}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
