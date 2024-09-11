interface LoaderIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

export const LoaderIcon2 = ({ color, size, ...props }: LoaderIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={size} {...props}>
      <circle cx="40" cy="100" r="15" fill={color} stroke={color} strokeWidth="15">
        <animate
          attributeName="opacity"
          begin="-0.4"
          calcMode="spline"
          dur="2"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          values="1;0;1;"
        ></animate>
      </circle>
      <circle cx="100" cy="100" r="15" fill={color} stroke={color} strokeWidth="15">
        <animate
          attributeName="opacity"
          begin="-0.2"
          calcMode="spline"
          dur="2"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          values="1;0;1;"
        ></animate>
      </circle>
      <circle cx="160" cy="100" r="15" fill={color} stroke={color} strokeWidth="15">
        <animate
          attributeName="opacity"
          begin="0"
          calcMode="spline"
          dur="2"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          values="1;0;1;"
        ></animate>
      </circle>
    </svg>
  )
}
