import { useState } from 'react'
import { useCallback, useEffect , useRef} from 'react'

// 1.use Callback: used for optimization it calls the function inside it when the dependencies are changed and returns a memorized function 
// 2.use effect: runs the function inside it whenever the page renders first-time or dependencies are changed
// 3.use ref : used to give reference of selected components in our page so that functions can be performed on referenced values

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  //Ref hook
  const passwordRef = useRef(null);
  // useCAllback for memorize
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str+="0123456789"
    if(character) str+="@#!$%^&*()"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, number, character, setPassword])

  const copyPassToClipboard = useCallback(()=>{
    // for see what is copy
    passwordRef.current?.select()
    // for range of selection to copy
    passwordRef.current?.setSelectionRange(0,100)

    window.navigator.clipboard.writeText(password)
  },
  [password])
  useEffect(()=>{
    passwordGenerator()
  }, [length, number, character, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md pb-4 pt-2 mx-auto shadow-md rounded-lg px-4 my-9 text-orange-500 bg-gray-700'>
        <p className="text-xl text-center text-white mb-2">Password generator</p>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} 
          className='outline-none w-full py-1 px-3' 
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPassToClipboard}
          className='outline-none bg-blue-700 text-white
          px-3 py-0.5 shrink-0'>Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)}
            />
            <label>length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={number}
            id="numberInput"
            onChange={()=>{
              setNumber((prev)=>!prev);
            }}
            />
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={character}
            id="characterInput"
            onChange={()=>{
              setCharacter((prev)=>!prev);
            }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App