import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import MotalentForm from "@/components/shared/molecules/motalent-form";
import MotalentFormItem from "@/components/shared/molecules/motalent-form-item";
import MotalentInput from "@/components/shared/molecules/motalent-input";
import { FormField } from "@/components/ui/form";

import { InferZodSchema } from "@/interfaces/zod.interface";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email is too short.",
    })
    .email({
      message: "Email is invalid.",
    }),
  password: z.string().nonempty("Password is required."),
  rememberMe: z.boolean(),
});

type LoginFieldValues = InferZodSchema<typeof formSchema>;

export default function LoginForm() {
  return (
    <MotalentForm<LoginFieldValues, object, LoginFieldValues>
      onSubmit={(data) => {
        alert(JSON.stringify(data));
      }}
      resolver={zodResolver(formSchema)}
      defaultValues={{
        email: "deprasny@mail.com",
        password: "",
        rememberMe: false,
      }}
      mode="onChange"
    >
      {({ control }) => (
        <div className="flex flex-col gap-4">
          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <MotalentFormItem
                label="Email"
                description="Your email will be protected by our policy."
              >
                <MotalentInput
                  placeholder="Please enter your email here.."
                  {...field}
                />
              </MotalentFormItem>
            )}
          />

          <FormField
            name="password"
            control={control}
            render={({ field }) => (
              <MotalentFormItem label="Password">
                <MotalentInput
                  placeholder="Please enter your password here.."
                  {...field}
                />
              </MotalentFormItem>
            )}
          />

          <FormField
            name="rememberMe"
            control={control}
            render={({ field: { value, onChange, ...restFields } }) => (
              <MotalentFormItem>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="remember-me-checkbox"
                    placeholder="Please enter your password here.."
                    checked={value}
                    onCheckedChange={(value) => {
                      onChange(value);
                    }}
                    {...restFields}
                  />
                  <label
                    htmlFor="remember-me-checkbox"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember Me
                  </label>
                </div>
              </MotalentFormItem>
            )}
          />

          <Button type="submit">Login</Button>
        </div>
      )}
    </MotalentForm>
  );
}
