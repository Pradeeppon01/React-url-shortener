import './App.css'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
//import CopyToClipboard from "react-copy-to-clipboard";

export default function App() {
  const [userInput, setUserInput] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${userInput}`)
      const data = await response.json();
      setShortUrl(data.result.short_link)
      console.log(e)
    } catch (e) {
      console.log(e)
    }
    setTimeout(() => {
      if (document.querySelector('h2').innerText == '') {
        alert('Please provide a valid link !!')
      }
    }, 1000)

  }
  function ChangeText() {
    const button = document.getElementById('copiedButton')
    console.log(button)
    button.innerText = 'COPIED ✔'
    setTimeout(() => { button.innerText = 'COPY 📋' }, 1000)
    console.log('copied')
  }
  function Myfunction() {
    document.querySelector('form').reset();
    document.querySelector('h2').innerText = '';
  }

  return (
    <>
    <div className='mainContainer'>
      <div className='container'>
        <h1>Your <span>URL</span> Shortener</h1>
        <form onSubmit={fetchData}>
          <input onChange={(e) => setUserInput(e.target.value)} type='text' placeholder='Enter the URL to be Shortened'></input>
          <div className='submit-button'><button>SUBMIT</button></div>
        </form>
      </div>
      <div className='copiedContainer'>
        <h2>{shortUrl}</h2>
        <CopyToClipboard text={shortUrl}>
          <button id='copiedButton' onClick={ChangeText}>COPY 📋</button>
        </CopyToClipboard>
        <div className='clearButton'>
        <button onClick={Myfunction}>CLEAR</button>
      </div>
      </div>
    </div >
      </>
  )
}
