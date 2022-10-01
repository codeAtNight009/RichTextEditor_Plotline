import React,{useState} from 'react'
import {createEditor} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'

function Speaker({name,value,timestamp,profilepic}) {
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <div className="speaker">
        <div className="speakerInfo">
            <img src={profilepic} alt="" />
            <h4>{name} <span style={{
                opacity:0.6
            }}>{timestamp}</span></h4>
            </div>
        <p className="speakerComment">
        <Slate editor={editor} value={value}>
            <Editable
            spellCheck = {false}
            />
        </Slate>
        </p>
    </div>
  )
}

export default Speaker