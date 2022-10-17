interface Props {
  topCharacter?: string;
  bottomCharacter?: string;
  widthMultipler?: number;
  specialEnter?: boolean;
  color?: string;
}

const Key = ({
  widthMultipler,
  topCharacter,
  bottomCharacter,
  specialEnter,
  color,
}: Props) => {
  if (specialEnter)
    return (
      <div className="h-[42px] relative m-0.5">
        <svg
          viewBox="0 0 65 88"
          className="backdrop-blur-2xl glass-fill"
          width={65}
          height={88}
        >
          <defs>
            <linearGradient
              id="glass"
              gradientUnits="userSpaceOnUse"
              x1="101.35%"
              y1="1.43%"
              x2="-1.35%"
              y2="98.57%"
            >
              <stop offset=".257" stopColor="#fff2f2" stopOpacity=".03" />
              <stop offset=".947" stopColor="#fffafa" stopOpacity=".07" />
              <stop offset=".947" stopColor="#fffafa" stopOpacity=".07" />
            </linearGradient>
            <filter
              id="prefix__filter0_f_291_84"
              x={0}
              y={0}
              width={104}
              height={104}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation={20}
                result="effect1_foregroundBlur_291_84"
              />
            </filter>
          </defs>
          <path
            d="M59 0H6a6 6 0 00-6 6v30a6 6 0 006 6h11a6 6 0 016 6v34a6 6 0 006 6h30a6 6 0 006-6V6a6 6 0 00-6-6z"
            fill="url(#glass)"
          />
          <g filter="url(#prefix__filter0_f_291_84)">
            <circle cx="16px" cy="16px" r="12" fill={color} />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 6a6 6 0 016-6H0v6zm0 30v52h29a6 6 0 01-6-6V48a6 6 0 00-6-6H6a6 6 0 01-6-6zm59 52h6v-6a6 6 0 01-6 6zm6-82V0h-6a6 6 0 016 6z"
            fill="#1E1E1E"
          />
        </svg>
        <p className="absolute text-xs font-bold bottom-0.5 left-3">
          {bottomCharacter}
        </p>
      </div>
    );

  return (
    <div className="relative m-0.5 overflow-hidden rounded-md">
      <div
        className="absolute top-1 left-2 rounded-full w-6 h-6 blur-[18px]"
        style={{ backgroundColor: color }}
      ></div>
      <div
        className="glass-background flex flex-col py-1 px-3 relative z-20"
        style={{
          width: widthMultipler ? 46 * widthMultipler - 4 : 42,
          height: 42,
        }}
      >
        <div className="flex flex-col flex-1">
          <div className="flex-1">
            <p className="text-xs font-bold">{topCharacter}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold">{bottomCharacter}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Key;
