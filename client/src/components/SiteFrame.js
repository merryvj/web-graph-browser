import React from 'react'
import { styled } from 'styled-components'
import LinkInput from './LinkInput'

function SiteFrame({url, setUrl}) {
  return (
    <Wrapper>
        <LinkInput updateBlocks={setUrl} currentURL={url}/>
        <Window>
            
            <Frame src={url}/>
        </Window>
    </Wrapper>
  )
}

const Window = styled.div`
    position: relative;
    height: calc(100% - 42px);
    width: 100%;
    overflow: hidden;
    padding: 4px;
    border: solid 1px black;
    border-top: none;
    background: white;
    border-radius: 0 0 4px 4px;
   
`
const Frame = styled.iframe`
    position: relative;
    height: 100%;
    width: 100%;
    border: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 50vw;
    padding: 24px;
    padding-left: 0;

`

export default SiteFrame