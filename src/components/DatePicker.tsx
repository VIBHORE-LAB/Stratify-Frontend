import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import {format} from "date-fns";
import { cn } from "../lib/utils"


interface DatePickerProps {
    date?: Date;
    onChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({date, onChange}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : "Pick date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" required={true} selected={date} onSelect={onChange} className="pointer-events-auto" initialFocus />
      </PopoverContent>
    </Popover>
  );
}