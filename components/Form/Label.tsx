interface Props {
  children: string;
  htmlFor: string;
}

const Label = ({ htmlFor, children }: Props) => (
  <label htmlFor={htmlFor} className="font-bold mb-1">
    {children}
  </label>
);

export default Label;
