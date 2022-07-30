interface Props {
  required: boolean;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  largeSpacing?: boolean;
}

const Input = ({
  required,
  type,
  name,
  id,
  placeholder,
  largeSpacing,
}: Props) => (
  <input
    required={required}
    type={type}
    name={name}
    id={id}
    placeholder={placeholder}
    className={`rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all ${
      largeSpacing ? "mb-10" : "mb-5"
    }`}
  />
);

export default Input;
