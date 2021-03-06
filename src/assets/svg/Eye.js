import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const EyeSvg = () => (
  <Svg width={22} height={16} fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 .5C6 .5 1.73 3.61 0 8c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C20.27 3.61 16 .5 11 .5ZM11 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm0-8C9.34 5 8 6.34 8 8s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Z"
      fill="#2D2E46"
    />
  </Svg>
);
