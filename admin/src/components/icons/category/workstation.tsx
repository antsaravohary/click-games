export const Workstation: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 48 48"
    >
      <path fill="#546E7A" d="M8 10H44V36H8z" />
      <path fill="#BBDEFB" d="M10 12H42V33H10z" />
      <path
        fill="#455A64"
        d="M23 36H29V39H23zM35 39c-2 0-16 0-18 0s-2 2-2 2v1h22v-1C37 41 37 39 35 39z"
      />
      <path fill="currentColor" d="M4 4H22V44H4z" />
      <path
        fill="#9FA8DA"
        d="M6 6H20V10H6zM6 12H20V14H6zM6 16H20V18H6zM6 20H20V22H6zM6 24H20V26H6z"
      />
      <path fill="#CDDC39" d="M13 36A2 2 0 1 0 13 40A2 2 0 1 0 13 36Z" />
    </svg>
  );
};
