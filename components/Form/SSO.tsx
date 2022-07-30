interface Props {
  text: string;
  icon: React.ReactNode;
  onClick: (e: any) => void;
  largeSpacing?: boolean;
}

const SSO = ({ icon, text, onClick, largeSpacing }: Props) => (
  <a
    onClick={(e) => onClick(e)}
    className={`w-full rounded-xl border border-neutral-600 bg-neutral-900 py-2 flex justify-center align-center h-11 hover:border-green-500 hover:border-1 hover:ring-green-500 hover:ring-1 transition-all ${
      largeSpacing ? "mb-10" : "mb-3"
    }`}
  >
    <div className="mr-2 self-center mb-0.5 flex">{icon}</div>
    <p className="font-bold">{text}</p>
  </a>
);

export default SSO;
