"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Progress from "@/components/ui/Progress";

/* ────────────────────────────────────────────
   Public types — used by consuming components
   ──────────────────────────────────────────── */

export interface StepFieldOption {
  label: string;
  value: string;
}

export interface StepField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select";
  placeholder: string;
  /** Only for `type: "select"` */
  options?: StepFieldOption[];
  /** Half-width on sm+ when paired with another half-width field */
  half?: boolean;
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  schema: any; // Zod schema — typed loosely to avoid Zod v3/v4 generics clash with @hookform/resolvers
  fields: StepField[];
}

export interface MultiStepFormProps {
  steps: FormStep[];
  onSubmit: (data: Record<string, unknown>) => Promise<void> | void;
  className?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  /** Callback to reset the form from the success screen */
  onReset?: () => void;
}

/* ────────────────────────────────────────────
   Shared input styling (matches site palette)
   ──────────────────────────────────────────── */

const inputBase = cn(
  "w-full border border-border bg-background-secondary/50 px-4 py-4 text-base text-text-primary",
  "placeholder:text-text-muted outline-none transition-all duration-300",
  "focus:border-warm focus:bg-background-secondary/80 sm:px-5 sm:text-sm"
);

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function MultiStepForm({
  steps,
  onSubmit,
  className,
  submitLabel = "Submit",
  successTitle = "Thank You!",
  successMessage = "We\u2019ll be in touch soon.",
  onReset,
}: MultiStepFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FieldValues>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  /* Current step's schema drives validation */
  const currentSchema = steps[step].schema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: formData,
  });

  const progress = ((step + 1) / steps.length) * 100;

  /* ── Advance or submit ── */
  const handleNext = async (data: FieldValues) => {
    const merged = { ...formData, ...data };
    setFormData(merged);

    if (step < steps.length - 1) {
      setStep(step + 1);
      reset(merged);
    } else {
      setIsSubmitting(true);
      try {
        await onSubmit(merged);
        setIsComplete(true);
      } catch {
        /* onSubmit should handle its own errors */
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  /* ── Go back ── */
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  /* ── Reset everything ── */
  const handleReset = () => {
    setStep(0);
    setFormData({});
    setIsComplete(false);
    reset({});
    onReset?.();
  };

  /* ── Animation ── */
  const variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className={cn("w-full", className)}>
      {!isComplete ? (
        <>
          {/* ─── Progress bar ─── */}
          <div className="mb-7">
            <div className="mb-2 flex items-center justify-between text-[11px] font-medium tracking-[0.15em] text-text-muted uppercase">
              <span>
                Step {step + 1} of {steps.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          {/* ─── Step indicators ─── */}
          <div className="mb-8 flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                    i < step
                      ? "bg-warm text-background"
                      : i === step
                        ? "border-2 border-warm bg-warm/10 text-warm"
                        : "border border-border bg-background-secondary text-text-muted"
                  )}
                >
                  {i < step ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="hidden text-[10px] tracking-[0.1em] text-text-muted uppercase sm:block">
                  {s.title}
                </span>
              </div>
            ))}
          </div>

          {/* ─── Form body ─── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="font-heading text-xl font-light text-text-primary sm:text-2xl">
                  {steps[step].title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {steps[step].description}
                </p>
              </div>

              <form
                onSubmit={handleSubmit(handleNext)}
                className="space-y-1"
              >
                {/* Field grid — supports half-width pairing */}
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {steps[step].fields.map((field) => (
                    <div
                      key={field.name}
                      className={cn(
                        field.half ? "sm:col-span-1" : "sm:col-span-2"
                      )}
                    >
                      {field.type === "select" ? (
                        <select
                          id={field.name}
                          defaultValue=""
                          {...register(field.name)}
                          className={cn(
                            inputBase,
                            "cursor-pointer appearance-none",
                            errors[field.name] && "border-red-500 focus:border-red-500"
                          )}
                        >
                          <option value="" disabled>
                            {field.placeholder}
                          </option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          {...register(field.name)}
                          className={cn(
                            inputBase,
                            errors[field.name] && "border-red-500 focus:border-red-500"
                          )}
                        />
                      )}
                      {errors[field.name] && (
                        <p className="px-1 pt-1 pb-1 text-xs text-red-400">
                          {errors[field.name]?.message as string}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={cn(
                      "inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-text-secondary uppercase transition-colors hover:text-warm",
                      step === 0 && "pointer-events-none opacity-0"
                    )}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "inline-flex items-center gap-2 border border-warm bg-warm px-8 py-3.5 text-sm font-semibold tracking-wide text-background transition-all duration-300",
                      "hover:bg-warm-hover hover:shadow-[0_0_20px_rgba(232,213,163,0.2)]",
                      "disabled:pointer-events-none disabled:opacity-60"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : step === steps.length - 1 ? (
                      submitLabel
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        /* ─── Success state ─── */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="py-10 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
          <h3 className="mt-6 font-heading text-3xl font-light text-text-primary">
            {successTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-md text-text-secondary">
            {successMessage}
          </p>
          <button
            onClick={handleReset}
            className="mt-8 text-xs font-medium tracking-[0.15em] text-warm uppercase transition-colors hover:text-warm-hover"
          >
            Submit Another Request
          </button>
        </motion.div>
      )}
    </div>
  );
}
