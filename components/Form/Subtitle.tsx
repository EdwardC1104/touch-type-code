interface Props {
  children: string;
}

const Subtitle = ({ children }: Props) => (
  <p className="text-neutral-400 text-sm font-medium mb-10">{children}</p>
);

export default Subtitle;
