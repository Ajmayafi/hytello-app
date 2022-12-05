import React from "react";
import LottieView from "lottie-react-native";
import styled from "styled-components/native";

const BgAniWapper = styled.View`
  width: 100%;
  position: absolute;
  height: 100%;
`;

export const BackgroundAnimationWrapper = () => {
  return (
    <BgAniWapper>
      <LottieView
        key="animation"
        autoPlay
        loop
        resizeMode="cover"
        source={require("../animations/pagesanimations.json")}
      />
    </BgAniWapper>
  );
};
