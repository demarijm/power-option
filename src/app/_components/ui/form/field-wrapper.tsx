import type { FieldError } from "react-hook-form";
// biome-ignore lint/style/useImportType: <explanation>
import React from "react";
import { FormError } from "./form-error";
import { Label } from "./label";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children } = props;
  return (
    <div>
      <Label>
        {label}
        <div className="mt-1">{children}</div>
      </Label>
      <FormError errorMessage={error?.message} />
    </div>
  );
};
