interface LoaderIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

export const LoaderIcon = ({ color, size, ...props }: LoaderIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width={size} {...props}>
      <path
        fill="none"
        stroke={color}
        strokeDasharray="300 385"
        strokeLinecap="round"
        strokeWidth="15"
        d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50z"
      >
        <animate
          attributeName="stroke-dashoffset"
          calcMode="spline"
          dur="2"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
          values="685;-685"
        ></animate>
      </path>
    </svg>
  )
}
