import { useFormField } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { VariantProps, cva } from "class-variance-authority";

const motalentCVA = cva([""], {
  variants: {
    size: {
      sm: "",
    },
    isError: {
      true: "ring-1 ring-red-500 focus-visible:ring-red-500 focus-visible:ring-offset-0",
    },
  },
  defaultVariants: {
    isError: false,
  },
});

type MotalentInputProps = InputProps & VariantProps<typeof motalentCVA>;

export default function MotalentInput(props: MotalentInputProps) {
  const { id, invalid } = useFormField();

  return (
    <Input
      id={id}
      className={motalentCVA({
        size: props.size,
        isError: props.isError || invalid,
      })}
      {...props}
    />
  );
}
