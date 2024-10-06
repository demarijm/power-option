"use client";
import type { UseFormRegisterReturn } from "react-hook-form";
import React from "react";
import {
  FieldWrapper,
  type FieldWrapperPassThroughProps,
} from "./field-wrapper";
import { cn } from "@/lib/utils";
type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const Select = (props: SelectFieldProps) => {
  const { label, options, error, className, defaultValue, registration } =
    props;
  return (
    <FieldWrapper label={label} error={error}>
      <select
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className,
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            key={label?.toString()}
            value={value}
          >
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
