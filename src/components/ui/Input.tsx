"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type InputAs = "input" | "textarea" | "select";

interface InputOption {
  label: string;
  value: string;
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "as"> {
  label?: string;
  error?: string;
  as?: InputAs;
  options?: InputOption[];
  rows?: number;
}

const baseFieldStyles = cn(
  "w-full border border-border bg-background px-5 py-4 text-sm text-text-primary",
  "placeholder:text-text-muted outline-none transition-colors duration-300",
  "focus:border-accent"
);

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, InputProps>(
  function Input(
    {
      label,
      type = "text",
      error,
      required,
      as = "input",
      options = [],
      rows = 5,
      className,
      id,
      ...rest
    },
    ref
  ) {
    const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const fieldClasses = cn(
      baseFieldStyles,
      error && "border-red-500 focus:border-red-500",
      className
    );

    const renderField = () => {
      if (as === "textarea") {
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={fieldId}
            rows={rows}
            required={required}
            className={cn(fieldClasses, "resize-none")}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        );
      }

      if (as === "select") {
        return (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={fieldId}
            required={required}
            className={cn(fieldClasses, "appearance-none cursor-pointer")}
            {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {rest.placeholder ? (
              <option value="" disabled>
                {rest.placeholder as string}
              </option>
            ) : null}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      }

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={fieldId}
          type={type}
          required={required}
          className={fieldClasses}
          {...rest}
        />
      );
    };

    return (
      <div className="flex flex-col gap-2">
        {label ? (
          <label
            htmlFor={fieldId}
            className="text-[11px] font-medium tracking-[0.15em] text-text-secondary uppercase"
          >
            {label}
            {required ? <span className="ml-1 text-accent">*</span> : null}
          </label>
        ) : null}

        {renderField()}

        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : null}
      </div>
    );
  }
);

export default Input;
