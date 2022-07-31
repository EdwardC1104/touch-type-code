import { FormEvent } from "react";

interface Props {
  value: string;
}

const Submit = ({ value }: Props) => (
  <input
    type="submit"
    className="font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center w-full h-11"
    value={value}
  />
);

export default Submit;
