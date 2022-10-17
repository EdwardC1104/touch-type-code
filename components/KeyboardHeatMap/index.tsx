import Key from "./Key";

const RED = "#B91212";
const ORANGE = "#FF5800";
const GREEN = "#2EA851";

const keyboard = [
  [
    { topCharacter: "¬", bottomCharacter: "`" },
    { topCharacter: "!", bottomCharacter: "1" },
    { topCharacter: '"', bottomCharacter: "2" },
    { topCharacter: "£", bottomCharacter: "3" },
    { topCharacter: "$", bottomCharacter: "4" },
    { topCharacter: "%", bottomCharacter: "5", color: GREEN },
    { topCharacter: "^", bottomCharacter: "6" },
    { topCharacter: "&", bottomCharacter: "7" },
    { topCharacter: "*", bottomCharacter: "8", color: GREEN },
    { topCharacter: "(", bottomCharacter: "9" },
    { topCharacter: ")", bottomCharacter: "0" },
    { topCharacter: "_", bottomCharacter: "-" },
    { topCharacter: "+", bottomCharacter: "=" },
    { topCharacter: "", bottomCharacter: "backspace", widthMultipler: 2 },
  ],
  [
    { topCharacter: "", bottomCharacter: "tab", widthMultipler: 1.5 },
    { topCharacter: "Q", bottomCharacter: "", color: RED },
    { topCharacter: "W", bottomCharacter: "", color: RED },
    { topCharacter: "E", bottomCharacter: "", color: RED },
    { topCharacter: "R", bottomCharacter: "", color: RED },
    { topCharacter: "T", bottomCharacter: "", color: RED },
    { topCharacter: "Y", bottomCharacter: "", color: GREEN },
    { topCharacter: "U", bottomCharacter: "", color: ORANGE },
    { topCharacter: "I", bottomCharacter: "", color: GREEN },
    { topCharacter: "O", bottomCharacter: "", color: GREEN },
    { topCharacter: "P", bottomCharacter: "", color: GREEN },
    { topCharacter: "{", bottomCharacter: "[" },
    { topCharacter: "}", bottomCharacter: "]", color: RED },
    {
      topCharacter: "",
      bottomCharacter: "enter",
      specialEnter: true,
      widthMultipler: 1.5,
      color: RED,
    },
  ],
  [
    { topCharacter: "", bottomCharacter: "caps", widthMultipler: 2 },
    { topCharacter: "A", bottomCharacter: "", color: GREEN },
    { topCharacter: "S", bottomCharacter: "", color: GREEN },
    { topCharacter: "D", bottomCharacter: "", color: GREEN },
    { topCharacter: "F", bottomCharacter: "", color: GREEN },
    { topCharacter: "G", bottomCharacter: "", color: ORANGE },
    { topCharacter: "H", bottomCharacter: "", color: GREEN },
    { topCharacter: "J", bottomCharacter: "", color: GREEN },
    { topCharacter: "K", bottomCharacter: "", color: RED },
    { topCharacter: "L", bottomCharacter: "" },
    { topCharacter: ":", bottomCharacter: ";" },
    { topCharacter: "@", bottomCharacter: "'" },
    { topCharacter: "~", bottomCharacter: "#" },
  ],
  [
    { topCharacter: "", bottomCharacter: "shift", widthMultipler: 1.25 },
    { topCharacter: "|", bottomCharacter: "\\" },
    { topCharacter: "Z", bottomCharacter: "", color: ORANGE },
    { topCharacter: "X", bottomCharacter: "", color: GREEN },
    { topCharacter: "C", bottomCharacter: "", color: GREEN },
    { topCharacter: "V", bottomCharacter: "", color: GREEN },
    { topCharacter: "B", bottomCharacter: "", color: GREEN },
    { topCharacter: "N", bottomCharacter: "", color: ORANGE },
    { topCharacter: "M", bottomCharacter: "", color: RED },
    { topCharacter: "<", bottomCharacter: ",", color: RED },
    { topCharacter: ">", bottomCharacter: ".", color: RED },
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

const KeyboardHeatMap = () => {
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

export default KeyboardHeatMap;
