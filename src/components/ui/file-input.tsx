import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileInputProps {
  label?: string;
  id?: string;
  onChange?: (files: FileList | null) => void;
  disabled?: boolean;
}

export function FileInput({
  label = "Upload File",
  id = "file",
  onChange,
  disabled = false,
}: FileInputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="file"
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.files)}
        accept=".pdf"
      />
    </div>
  );
}
