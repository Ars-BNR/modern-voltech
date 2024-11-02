interface Props {
  className: string;
}

const Star = ({ className }: Props) => {
  return (
    <div className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_11_362)">
          <path
            d="M16.1907 20L10.0004 15.2677L3.81016 20L6.18694 12.3575L0 7.65543H7.63855L10.0004 0L12.3623 7.65543H20L13.8139 12.3575L16.1907 20Z"
            fill="#FFD600"
          />
        </g>
        <defs>
          <clipPath id="clip0_11_362">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Star;
