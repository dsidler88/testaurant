
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";


export const style = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 600px;
  padding: 32px;
  background: linear-gradient(to top, #a0a0a0, #ffffff);
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.2);
`;

export const woosh = keyframes`
  0% {
    width: 12px;
    transform: translate(0px, 0px) rotate(-35deg);
  }
  15% {
    width: 50px;
  }
  30% {
    width: 12px;
    transform: translate(214px, -150px) rotate(-35deg);
  }
  30.1% {
    transform: translate(214px, -150px) rotate(46deg);
  }
  50% {
    width: 110px;
  }
  70% {
    width: 12px;
    transform: translate(500px, 150px) rotate(46deg);
  }
  70.1% {
    transform: translate(500px, 150px) rotate(-37deg);
  }
  85% {
    width: 50px;
  }
  100% {
    width: 12px;
    transform: translate(700px, 0) rotate(-37deg);
  }
`;

export const boomCircle = keyframes`
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
`;

export const boomTriangle = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  5% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 0;
  }
`;

export const boomTriangleBig = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  5% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 0;
  }
`;

export const boomDisc = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  5% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 0;
  }
`;

export const AnimationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const LightningContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  transform: translateY(-50%);
`;

export const Lightning = styled.div`
  position: absolute;
  display: block;
  height: 12px;
  width: 12px;
  border-radius: 12px;
  transform-origin: 6px 6px;
  animation-name: ${woosh};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.445, 0.050, 0.550, 0.950);
  animation-direction: alternate;

  &.white {
    background-color: white;
    box-shadow: 0px 50px 50px 0px rgba(255, 255, 255, 0.3);
  }

  &.red {
    background-color: #fc7171;
    box-shadow: 0px 50px 50px 0px rgba(252, 113, 113, 0.3);
    animation-delay: 0.2s;
  }
`;

export const BoomContainer = styled.div`
  position: absolute;
  display: flex;
  width: 80px;
  height: 80px;
  text-align: center;
  align-items: center;
  transform: translateY(-50%);
  left: 200px;
  top: -145px;

  &.second {
    left: 485px;
    top: 155px;
  }
`;

export const Shape = styled.div`
  display: inline-block;
  position: relative;
  opacity: 0;
  transform-origin: center center;

  &.triangle {
    width: 0;
    height: 0;
    border-style: solid;
    transform-origin: 50% 80%;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    margin-left: -15px;
    border-width: 0 2.5px 5px 2.5px;
    border-color: transparent transparent #fff transparent;
    animation-name: ${boomTriangle};
  }

  &.triangle-big {
    width: 0;
    height: 0;
    border-style: solid;
    transform-origin: 50% 80%;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    margin-left: -7px;
    border-width: 0 5px 10px 5px;
    border-color: transparent transparent #fff transparent;
    animation-name: ${boomTriangleBig};
  }

  &.circle {
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 50%;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    margin-left: -2px;
    animation-name: ${boomCircle};
  }

  &.disc {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    margin-left: -5px;
    animation-name: ${boomDisc};
  }
`;


