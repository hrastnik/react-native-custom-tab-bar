import React, { SFC } from "react";
import { Text, TextProps } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const nameMap = {
  A: "md-home",
  B: "logo-rss",
  C: "md-alarm",
  D: "md-basket",
  E: "md-build"
};

const Icon: SFC<
  {
    name: string;
    color: string;
  } & TextProps
> = ({ name, color, style, ...props }) => {
  return (
    <Ionicons
      name={nameMap[name]}
      color={color}
      size={28}
      style={style}
      {...props}
    />
  );
};

export default Icon;
