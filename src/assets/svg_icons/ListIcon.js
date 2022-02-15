import * as React from "react"
import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import {
  IconColor1,
} from '../../utils/appTheme'

function ListIcon(props) {
  return (
    <Svg
      width={127}
      height={152}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M63.253 142.253c34.934 0 63.253-28.319 63.253-63.253s-28.32-63.253-63.253-63.253C28.319 15.747 0 44.067 0 79c0 34.934 28.32 63.253 63.253 63.253z"
        fill="url(#prefix__paint0_linear_29:1117)"
      />
      <G filter="url(#prefix__filter0_d_29:1117)">
        <Path
          d="M99.518 52.012h-72.53a4.217 4.217 0 00-4.217 4.217v88.554A4.217 4.217 0 0026.988 149h72.53a4.217 4.217 0 004.217-4.217V56.229a4.217 4.217 0 00-4.217-4.217z"
          fill="#fff"
        />
      </G>
      <Path
        d="M54.82 64.663H32.891a2.53 2.53 0 100 5.06h21.927a2.53 2.53 0 100-5.06z"
        fill="#B4DAFF"
      />
      <Path
        d="M70 75.626H32.892a2.53 2.53 0 100 5.06H70a2.53 2.53 0 100-5.06z"
        fill="#DFEAFB"
      />
      <Path
        d="M54.82 87.434H32.891a2.53 2.53 0 100 5.06h21.927a2.53 2.53 0 100-5.06z"
        fill="#B4DAFF"
      />
      <Path
        d="M70 98.397H32.892a2.53 2.53 0 000 5.061H70a2.53 2.53 0 000-5.06z"
        fill="#DFEAFB"
      />
      <Path
        d="M54.82 110.205H32.891a2.53 2.53 0 100 5.06h21.927a2.53 2.53 0 000-5.06z"
        fill="#B4DAFF"
      />
      <Path
        d="M70 121.168H32.892a2.53 2.53 0 000 5.061H70a2.53 2.53 0 000-5.061z"
        fill="#DFEAFB"
      />
      <G filter="url(#prefix__filter1_d_29:1117)">
        <Path
          d="M99.518 9h-72.53a4.217 4.217 0 00-4.217 4.217v25.301a4.217 4.217 0 004.217 4.217h72.53a4.217 4.217 0 004.217-4.217V13.217A4.217 4.217 0 0099.518 9z"
          fill={IconColor1}
        />
      </G>
      <Path
        d="M54.82 18.277H32.891a2.53 2.53 0 000 5.06h21.927a2.53 2.53 0 000-5.06z"
        fill="#B4DAFF"
      />
      <Path
        d="M70 29.24H32.892a2.53 2.53 0 100 5.061H70a2.53 2.53 0 000-5.06z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_29:1117"
          x1={63.253}
          y1={15.747}
          x2={63.253}
          y2={142.253}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E3ECFA" />
          <Stop offset={1} stopColor="#DAE7FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default ListIcon
