interface Props {
  children: string;
}

const Subtitle = ({ children }: Props) => (
  <p className="text-red-600 text-sm font-medium mt-2 pointer-events-none">
    {children}
  </p>
);

export default Subtitle;
