import React, {useState, useEffect} from 'react'
import { styled } from 'styled-components'

function LinkInput({updateBlocks, currentURL}) {
    const [channelURL, setChannelURL] = useState("https://www.recurse.com/");

    useEffect(() => {
        setChannelURL(currentURL);
    }, [currentURL]);

    function handleSubmit(e) {
        e.preventDefault();
        let newUrl = channelURL;
        updateBlocks(newUrl);
    }

  return (
    <Wrapper onSubmit={(e) => handleSubmit(e)}>
        <Form>
            {/* <label htmlFor='url'>Channel URL</label> */}
            <URLInput
                id='url'
                type='url'
                value={channelURL}
                placeholder={channelURL}
                onChange={(e) => setChannelURL(e.target.value)}
            >
            </URLInput>
            <SubmitBtn type='submit' value="Set url"></SubmitBtn>
        </Form>
    </Wrapper>
  )
}


const Wrapper = styled.div`
    width: 100%;
    height: auto;
    color: black;
`

const Form = styled.form`
    display: flex;
    height: 100%;
    border: solid 1px black;
    overflow: hidden;
    border-radius: 4px 4px 0 0;
`

const URLInput = styled.input`
    & {
        outline: none;
        border: 0;
        border-right: solid 1px black;
        height: 100%;
        width: 100%;
        padding: 12px 8px;
        color: black;
        flex: 7;
        transition: background 0.3s;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:focus {
      transition: background-color 0s 600000s, color 0s 600000s;
    }

`

const SubmitBtn = styled.input`
    height: 100%;
    width: 100%;
    flex: 1;
    padding: 12px 8px;
    color: black;
    border-radius: 0;
    outline: 0;
    border: 0;
    cursor: pointer;
`

export default LinkInput