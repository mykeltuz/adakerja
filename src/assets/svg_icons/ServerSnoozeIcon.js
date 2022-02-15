import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function ServerSnoozeIcon(props) {
  return (
    <Svg
      width={133}
      height={113}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M83.396 88c24.301 0 44-19.7 44-44s-19.699-44-44-44c-24.3 0-44 19.7-44 44s19.7 44 44 44z"
        fill="url(#prefix__paint0_linear_399:4332)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102.887 112.272H35.389v-.101c-10.773-1.048-19.193-10.13-19.193-21.178 0-11.752 9.527-21.278 21.28-21.278.139 0 .278 0 .416.004v-.004c0-17.974 14.57-32.544 32.544-32.544 12.008 0 22.497 6.503 28.137 16.18a29.853 29.853 0 014.407-.325c16.361 0 29.624 13.262 29.624 29.623 0 15.315-11.623 27.916-26.529 29.463v.16H102.887z"
        fill="#F5F9FD"
      />
      <Path
        d="M67.532 74.721a7.823 7.823 0 01-15.648 0h1.725a6.098 6.098 0 1012.198 0h1.725zM93.833 74.721a7.825 7.825 0 01-13.356 5.532 7.824 7.824 0 01-2.291-5.532h1.725a6.099 6.099 0 0012.197 0h1.725zM65.504 88.967h14.053v2.04H65.504zM4.108 49.025h7.264v2.385H.396v-1.742l7.126-10.263H.406V37h10.808v1.702L4.108 49.025zM16.79 62.164h4.52v1.484h-6.83v-1.084l4.434-6.386h-4.428V54.68h6.725v1.06l-4.422 6.423z"
        fill="#CBDCFF"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_399:4332"
          x1={83.396}
          y1={0}
          x2={83.396}
          y2={88}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E3ECFA" />
          <Stop offset={1} stopColor="#DAE7FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default ServerSnoozeIcon
