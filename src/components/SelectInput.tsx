import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";

interface SelectInputProps {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between bg-black text-white border-gray-700", className)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
<PopoverContent
  side="bottom"
  align="start"
  avoidCollisions={false}
  className={cn(
    "w-[300px] p-0 !bg-[#0F0F0F] border border-gray-700 text-white shadow-lg"
  )}
>
  <Command className="bg-[#0F0F0F] text-white">
    <CommandInput
      placeholder="Search ticker..."
      className="text-white placeholder-gray-500 bg-[#0F0F0F]"
    />
    <CommandEmpty className="text-gray-400">No results found.</CommandEmpty>

    {/* Scrollable list with custom scrollbar */}
    <div
      className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#0a0a0a] scrollbar-track-[#1a1a1a]"
    >
      <CommandGroup className="bg-[#0F0F0F]">
        {options.map((opt) => (
          <CommandItem
            key={opt.value}
            value={opt.label}
            className="text-white hover:bg-green-600 focus:bg-green-600"
            onSelect={() => {
              onChange(opt.value);
              setOpen(false);
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === opt.value ? "opacity-100" : "opacity-0"
              )}
            />
            {opt.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </div>
  </Command>
</PopoverContent>
    </Popover>
  );
};
