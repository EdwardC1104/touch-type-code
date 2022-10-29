interface Props {
  value: string;
  mini?: boolean;
}

const Submit = ({ value, mini }: Props) => (
  <input
    type="submit"
    className={`font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center h-11 mt-2 mb-1 ${
      mini ? "w-40" : "w-full"
    }`}
    value={value}
  />
);

export default Submit;
