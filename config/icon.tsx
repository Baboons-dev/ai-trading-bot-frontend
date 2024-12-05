const Icons = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'btnL':
      return (
        <svg
          className={className}
          width="9"
          height="45"
          viewBox="0 0 9 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_16_8)">
            <path d="M180 45H8.54L0 36.46V0H180V17.08V45Z" fill="#F20823" />
          </g>
          <defs>
            <clipPath id="clip0_16_8">
              <rect width="9" height="45" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'btnR':
      return (
        <svg
          className={className}
          width="17"
          height="45"
          viewBox="0 0 17 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_16_10)">
            <path
              d="M17 45H-154.46L-163 36.46V0H-0.0800018L17 17.08V45Z"
              fill="#F20823"
            />
          </g>
          <defs>
            <clipPath id="clip0_16_10">
              <rect width="17" height="45" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    // case 'newSvg':
    //   className={className}
    //   return svg;
  }
};

export default Icons;
