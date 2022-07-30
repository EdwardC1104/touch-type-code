interface Props {
  children: string;
}

const Title = ({ children }: Props) => (
  <h1 className="font-bold text-2xl mb-2">{children}</h1>
);

export default Title;
