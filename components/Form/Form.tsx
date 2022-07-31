interface Props {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ children, onSubmit }: Props) => (
  <form onSubmit={onSubmit}>{children}</form>
);

export default Form;
