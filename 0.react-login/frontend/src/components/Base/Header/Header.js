import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtil';

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
  ${shadow(1)}
`;

const WhiteBackground = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  height: auth;
`;

// 헤더의 내용
const HeaderContents = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  padding-right: 1rem;
  padding-left: 1rem;
  ${media.wide`
    width: 992px;
  `}

  ${media.tablet`
    width: 100%;
  `}
`;
// 로고
const Logo = styled.div`
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: ${oc.teal[7]};
    font-family: 'Rajdhani';
`;

// 중간 여백
const Spacer = styled.div`
    flex-grow: 1;
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 3px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

const Header = ({children}) => {
  return (
    <Positioner>
        <WhiteBackground>
            <HeaderContents>
                <Logo>Login</Logo>
                <Spacer />
                {children}
            </HeaderContents>
        </WhiteBackground>
        <GradientBorder />
    </Positioner>
  );
};

export default Header;