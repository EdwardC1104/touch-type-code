interface Props {
  children: string;
}

const Subtitle = ({ children }: Props) => (
  <p className="text-neutral-400 text-sm font-medium mb-8">{children}</p>
);

export default Subtitle;
