import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
interface SelectInputProps{
    value: string;
    onChange:(val: string) => void;
    options:{value: string; label: string} [];
    placeholder?: string;
}


export const SelectInput: React.FC<SelectInputProps> = ({ value, onChange, options, placeholder }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="bg-background/50">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((opt) => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
