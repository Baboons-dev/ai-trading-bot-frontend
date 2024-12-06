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
    case 'x_icon':
      return (
        <svg
          className={className}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_24_215)">
            <path
              d="M11.6078 15.1383L0.8125 0.8125H4.39222L15.1875 15.1383H11.6078Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.6795 0.8125L8.98901 6.91478"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.32043 15.1382L7.00663 9.04053"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_24_215">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'arrow-left':
      return (
        <svg
          className={className}
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.0859 9.5H0.914062"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.46094 1.95312L0.914062 9.5L8.46094 17.0469"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case 'mobile-menu':
      return (
        <svg
          className={className}
          width="28"
          height="29"
          viewBox="0 0 28 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_42_319"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="-1"
            y="0"
            width="29"
            height="29"
          >
            <rect
              x="-0.00146484"
              y="0.5"
              width="28.0015"
              height="27.9998"
              fill="#D9D9D9"
            />
          </mask>
          <g mask="url(#mask0_42_319)">
            <path
              d="M4.66551 21.4999C4.33493 21.4999 4.05784 21.3881 3.83421 21.1645C3.61059 20.9409 3.49878 20.6638 3.49878 20.3332C3.49878 20.0027 3.61059 19.7256 3.83421 19.502C4.05784 19.2784 4.33493 19.1666 4.66551 19.1666H23.3332C23.6637 19.1666 23.9408 19.2784 24.1645 19.502C24.3881 19.7256 24.4999 20.0027 24.4999 20.3332C24.4999 20.6638 24.3881 20.9409 24.1645 21.1645C23.9408 21.3881 23.6637 21.4999 23.3332 21.4999H4.66551ZM4.66551 15.6666C4.33493 15.6666 4.05784 15.5548 3.83421 15.3312C3.61059 15.1076 3.49878 14.8305 3.49878 14.4999C3.49878 14.1694 3.61059 13.8923 3.83421 13.6687C4.05784 13.4451 4.33493 13.3333 4.66551 13.3333H23.3332C23.6637 13.3333 23.9408 13.4451 24.1645 13.6687C24.3881 13.8923 24.4999 14.1694 24.4999 14.4999C24.4999 14.8305 24.3881 15.1076 24.1645 15.3312C23.9408 15.5548 23.6637 15.6666 23.3332 15.6666H4.66551ZM4.66551 9.83331C4.33493 9.83331 4.05784 9.72151 3.83421 9.4979C3.61059 9.27429 3.49878 8.99721 3.49878 8.66666C3.49878 8.3361 3.61059 8.05902 3.83421 7.83541C4.05784 7.6118 4.33493 7.5 4.66551 7.5H23.3332C23.6637 7.5 23.9408 7.6118 24.1645 7.83541C24.3881 8.05902 24.4999 8.3361 24.4999 8.66666C24.4999 8.99721 24.3881 9.27429 24.1645 9.4979C23.9408 9.72151 23.6637 9.83331 23.3332 9.83331H4.66551Z"
              fill="#F20823"
            />
          </g>
        </svg>
      );
    // case 'newSvg':
    //   className={className}
    //   return svg;
  }
};

export default Icons;
