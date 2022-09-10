interface Props {
  children: string;
  htmlFor: string;
}

const Label = ({ htmlFor, children }: Props) => (
  <label htmlFor={htmlFor} className="font-bold leading-loose">
    {children}
  </label>
);

export default Label;
