import React from 'react'
import { styled, keyframes } from 'styled-components'

function Loader() {
  return (
    <Wrapper>
        <div>Getting links...</div>
    </Wrapper>
  )
}

const Animation = keyframes`
    0% {opacity: 0}
    50% {opacity: 1}
    100% {opacity: 0}
`

const Wrapper = styled.div`
    height: 100vh;
    width: 50vw;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    animation: ${Animation} 2s both;
    animation-iteration-count: infinite;
`


export default Loader