import ErrorMessage from "./ErrorMessage";

interface Props {
  label: string;
  required?: boolean;
  type: string;
  name: string;
  placeholder?: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
  touched?: boolean;
  setTouched: (touched: boolean) => void;
}

const INVISIBLE_CHARACRTER = "\u200B";

const Input = ({
  label,
  required,
  type,
  name,
  placeholder,
  id,
  onChange,
  value,
  error,
  touched,
  setTouched,
}: Props) => {
  const showError = touched && error;

  return (
    <>
      <label htmlFor={id} className="font-bold leading-loose">
        {label}
      </label>
      <input
        required={required}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={(e) => {
          setTouched(true);
          onChange(e);
        }}
        value={value}
        className={`rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all`}
      />
      <ErrorMessage>{showError ? error : INVISIBLE_CHARACRTER}</ErrorMessage>
    </>
  );
};

export default Input;
