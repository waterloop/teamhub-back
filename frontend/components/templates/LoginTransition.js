import React, { useEffect, useRef, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import LoadingModal from '../atoms/LoadingModal';

/**
 * @param { {children: *, loginTransition: { state: "PRE_TRANSITION" | "SHOWN" | "POST_TRANSITION", hide: (onFinish: () => void) => void}}}
 */
const LoginTransition = ({ children, transitionRef }) => {
    return <Container ref={transitionRef}>{children}</Container>;
};
export default LoginTransition;

const Container = styled.div`
    transition: all 0.5s ease;
    transform: translateX(110%);
`;
