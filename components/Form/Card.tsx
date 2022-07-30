interface Props {
  children: React.ReactNode;
}

const Card = ({ children }: Props) => (
  <div className="bg-neutral-900 rounded-xl px-8 py-12 sm:w-[30rem] w-full h-fit my-16  drop-shadow-lg">
    {children}
  </div>
);

export default Card;
