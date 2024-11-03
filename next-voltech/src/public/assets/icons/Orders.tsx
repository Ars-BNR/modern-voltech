interface Props {
  className: string;
}

const Orders = ({ className }: Props) => {
  return (
    <div className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_19_7)">
          <path
            d="M19.4339 3.41677C18.9589 2.83342 18.2505 2.50007 17.5005 2.50007H6.03351L6.00018 2.2084C5.92801 1.60025 5.63542 1.03965 5.17778 0.632683C4.72014 0.225719 4.12919 0.000625685 3.51677 0L2.50008 0C2.04173 0 1.66672 0.375011 1.66672 0.833358C1.66672 1.29171 2.04173 1.66672 2.50008 1.66672H3.51677C3.94178 1.66672 4.2918 1.98339 4.3418 2.40007L5.49183 12.1504C5.74184 14.2504 7.51689 15.8338 9.63362 15.8338H16.6672C17.1255 15.8338 17.5005 15.4588 17.5005 15.0004C17.5005 14.5421 17.1255 14.1671 16.6672 14.1671H9.63362C8.55859 14.1671 7.62523 13.4837 7.27522 12.5004H15.1338C17.1172 12.5004 18.8339 11.092 19.2172 9.15027L19.9506 5.49183C20.0239 5.12929 20.0155 4.75497 19.9262 4.39606C19.8368 4.03714 19.6687 3.70262 19.4339 3.41677ZM18.3172 5.16682L17.5839 8.82526C17.4693 9.391 17.1629 9.89982 16.7165 10.2658C16.2701 10.6317 15.711 10.8323 15.1338 10.8337H7.01688L6.23352 4.16679H17.5005C17.7505 4.16679 17.9839 4.27513 18.1422 4.47513C18.3006 4.66681 18.3672 4.92515 18.3172 5.16682ZM9.16694 18.3339C9.16694 19.2506 8.41692 20.0006 7.50023 20.0006C6.58353 20.0006 5.83351 19.2506 5.83351 18.3339C5.83351 17.4172 6.58353 16.6672 7.50023 16.6672C8.41692 16.6672 9.16694 17.4172 9.16694 18.3339ZM16.6672 18.3339C16.6672 19.2506 15.9171 20.0006 15.0005 20.0006C14.0838 20.0006 13.3337 19.2506 13.3337 18.3339C13.3337 17.4172 14.0838 16.6672 15.0005 16.6672C15.9171 16.6672 16.6672 17.4172 16.6672 18.3339ZM0 5.00015C0 4.5418 0.375011 4.16679 0.833358 4.16679H2.11673C2.57508 4.16679 2.95009 4.5418 2.95009 5.00015C2.95009 5.4585 2.57508 5.83351 2.11673 5.83351H0.833358C0.375011 5.83351 0 5.4585 0 5.00015ZM0 8.33358C0 7.87524 0.375011 7.50022 0.833358 7.50022H2.50008C2.95842 7.50022 3.33343 7.87524 3.33343 8.33358C3.33343 8.79193 2.95842 9.16694 2.50008 9.16694H0.833358C0.375011 9.16694 0 8.79193 0 8.33358ZM4.16679 11.667C4.16679 12.1254 3.79178 12.5004 3.33343 12.5004H0.833358C0.375011 12.5004 0 12.1254 0 11.667C0 11.2087 0.375011 10.8337 0.833358 10.8337H3.33343C3.79178 10.8337 4.16679 11.2087 4.16679 11.667Z"
            fill="#8B8B8B"
          />
        </g>
        <defs>
          <clipPath id="clip0_19_7">
            <rect width="20" height="20.0006" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Orders;