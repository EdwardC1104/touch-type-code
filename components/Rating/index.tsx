interface Props {
  value: number;
}

const Rating = ({ value }: Props) => {
  const mouths = [
    <path
      key="1"
      d="M13.5 21c1.333-1.333 4.667-1.333 6 0"
      stroke="#171717"
      strokeLinecap="round"
    />,
    null,
    <path key="3" d="M13.5 21h6" stroke="#171717" strokeLinecap="round" />,
    <path
      key="4"
      d="M12 20c2 2 7 2 9 0"
      stroke="#313033"
      strokeLinecap="round"
    />,
    <path
      key="5"
      d="M19.875 20.277c-1.494 3.13-4.256 3.13-5.75 0a.194.194 0 01.178-.277h5.394c.143 0 .24.148.178.277z"
      fill="#171717"
    />,
  ];

  const starState: boolean[] = Array(5).fill(false).fill(true, 0, value);

  return (
    <div className="grid grid-cols-5 gap-[5px]">
      {starState.map((active, index) => (
        <svg
          key={`gold-${index}`}
          width={34}
          height={33}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.544 0c-2.5 0-3.993 6.73-6.165 8.974C8.207 11.22.663 9.363.043 12c-.62 2.637 5.612 5.977 6.36 9.397.753 3.42-2.072 9.541 0 11.103 2.073 1.562 6.798-3.504 10.14-3.504 3.343 0 8.068 5.02 10.14 3.504 2.074-1.515-.75-7.682 0-11.103.752-3.42 7.043-6.493 6.36-9.397-.681-2.904-8.162-.78-10.332-3.026C20.539 6.73 19.043 0 16.544 0z"
            fill={active ? "#FFEB6D" : "#313033"}
          />
          {index === value - 1 && (
            <>
              {index < 4 ? (
                <>
                  <circle cx={12} cy={16} r={1} fill="#171717" />
                  <circle cx={21} cy={16} r={1} fill="#171717" />
                </>
              ) : (
                <path
                  d="M11 16.3l1.5-1.3 1.5 1.3M20 16.3l1.3-1.3 1.3 1.3"
                  stroke="#171717"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {mouths[index]}
            </>
          )}
        </svg>
      ))}
    </div>
  );
};

export default Rating;
