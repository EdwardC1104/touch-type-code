import Key from "./Key";

interface Props {
  layout: Key[][];
}

const Keyboard = ({ layout }: Props) => {
  return (
    <div className="w-min">
      {layout.map((row, rowIndex) => (
        <div className="flex flex-row" key={rowIndex}>
          {row.map((key, colIndex) => (
            <Key
              key={`${rowIndex}-${colIndex}`}
              topCharacter={key.topCharacter}
              bottomCharacter={key.bottomCharacter}
              widthMultipler={key.widthMultipler}
              specialEnter={key.specialEnter}
              color={key.color}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
