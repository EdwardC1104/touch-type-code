interface Props {
  children: string | React.ReactNode;
}

const Subtitle = ({ children }: Props) => (
  <p className="text-red-600 text-sm font-medium pointer-events-none">
    {children}
  </p>
);

export default Subtitle;
