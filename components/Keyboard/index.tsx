import Key from "./Key";

const RED = "#B91212";
const ORANGE = "#FF5800";
const GREEN = "#2EA851";

interface Props {
  greenKeys: ReadonlyArray<string | undefined>;
  orangeKeys: ReadonlyArray<string | undefined>;
  redKeys: ReadonlyArray<string | undefined>;
}

interface Key {
  topCharacter: string;
  bottomCharacter: string;
  color?: string;
  widthMultipler?: number;
  specialEnter?: boolean;
}

type IKeyboard = Key[][];

const Keyboard = ({ greenKeys, orangeKeys, redKeys }: Props) => {
  const keyboard: IKeyboard = [
    [
      { topCharacter: "¬", bottomCharacter: "`" },
      { topCharacter: "!", bottomCharacter: "1" },
      { topCharacter: '"', bottomCharacter: "2" },
      { topCharacter: "£", bottomCharacter: "3" },
      { topCharacter: "$", bottomCharacter: "4" },
      { topCharacter: "%", bottomCharacter: "5" },
      { topCharacter: "^", bottomCharacter: "6" },
      { topCharacter: "&", bottomCharacter: "7" },
      { topCharacter: "*", bottomCharacter: "8" },
      { topCharacter: "(", bottomCharacter: "9" },
      { topCharacter: ")", bottomCharacter: "0" },
      { topCharacter: "_", bottomCharacter: "-" },
      { topCharacter: "+", bottomCharacter: "=" },
      { topCharacter: "", bottomCharacter: "backspace", widthMultipler: 2 },
    ],
    [
      { topCharacter: "", bottomCharacter: "tab", widthMultipler: 1.5 },
      { topCharacter: "Q", bottomCharacter: "" },
      { topCharacter: "W", bottomCharacter: "" },
      { topCharacter: "E", bottomCharacter: "" },
      { topCharacter: "R", bottomCharacter: "" },
      { topCharacter: "T", bottomCharacter: "" },
      { topCharacter: "Y", bottomCharacter: "" },
      { topCharacter: "U", bottomCharacter: "" },
      { topCharacter: "I", bottomCharacter: "" },
      { topCharacter: "O", bottomCharacter: "" },
      { topCharacter: "P", bottomCharacter: "" },
      { topCharacter: "{", bottomCharacter: "[" },
      { topCharacter: "}", bottomCharacter: "]" },
      {
        topCharacter: "",
        bottomCharacter: "enter",
        specialEnter: true,
        widthMultipler: 1.5,
      },
    ],
    [
      { topCharacter: "", bottomCharacter: "caps", widthMultipler: 2 },
      { topCharacter: "A", bottomCharacter: "" },
      { topCharacter: "S", bottomCharacter: "" },
      { topCharacter: "D", bottomCharacter: "" },
      { topCharacter: "F", bottomCharacter: "" },
      { topCharacter: "G", bottomCharacter: "" },
      { topCharacter: "H", bottomCharacter: "" },
      { topCharacter: "J", bottomCharacter: "" },
      { topCharacter: "K", bottomCharacter: "" },
      { topCharacter: "L", bottomCharacter: "" },
      { topCharacter: ":", bottomCharacter: ";" },
      { topCharacter: "@", bottomCharacter: "'" },
      { topCharacter: "~", bottomCharacter: "#" },
    ],
    [
      { topCharacter: "", bottomCharacter: "shift", widthMultipler: 1.25 },
      { topCharacter: "|", bottomCharacter: "\\" },
      { topCharacter: "Z", bottomCharacter: "" },
      { topCharacter: "X", bottomCharacter: "" },
      { topCharacter: "C", bottomCharacter: "" },
      { topCharacter: "V", bottomCharacter: "" },
      { topCharacter: "B", bottomCharacter: "" },
      { topCharacter: "N", bottomCharacter: "" },
      { topCharacter: "M", bottomCharacter: "" },
      { topCharacter: "<", bottomCharacter: "," },
      { topCharacter: ">", bottomCharacter: "." },
      { topCharacter: "?", bottomCharacter: "/" },
      { topCharacter: "", bottomCharacter: "shift", widthMultipler: 2.75 },
    ],
    [
      { topCharacter: "", bottomCharacter: "ctrl", widthMultipler: 1.5 },
      { topCharacter: "", bottomCharacter: "", widthMultipler: 1.2 },
      { topCharacter: "", bottomCharacter: "alt", widthMultipler: 1.2 },
      { topCharacter: "", bottomCharacter: "space", widthMultipler: 7.2 },
      { topCharacter: "", bottomCharacter: "alt", widthMultipler: 1.2 },
      { topCharacter: "", bottomCharacter: "", widthMultipler: 1.2 },
      { topCharacter: "", bottomCharacter: "ctrl", widthMultipler: 1.5 },
    ],
  ];

  for (const row of keyboard) {
    for (const key of row) {
      if (greenKeys.includes(key.bottomCharacter)) key.color = GREEN;
      else if (orangeKeys.includes(key.bottomCharacter)) key.color = ORANGE;
      else if (redKeys.includes(key.bottomCharacter)) key.color = RED;

      if (greenKeys.includes(key.topCharacter)) key.color = GREEN;
      else if (orangeKeys.includes(key.topCharacter)) key.color = ORANGE;
      else if (redKeys.includes(key.topCharacter)) key.color = RED;
    }
  }

  return (
    <div className="w-min">
      {keyboard.map((row, rowIndex) => (
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
