export type ErrorProps = {
  errorMessage?: string | null;
};

export const FormError = ({ errorMessage }: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div
      role="alert"
      aria-label={errorMessage}
      className="text-sm font-semibold text-red-500"
    >
      {errorMessage}
    </div>
  );
};
