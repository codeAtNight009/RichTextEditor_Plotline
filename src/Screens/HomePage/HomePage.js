import React,{useState,useCallback} from 'react'
import {createEditor} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'
import Picker from 'emoji-picker-react'
import {SketchPicker} from 'react-color';
import NavBar from '../../Components/NavBar/NavBar'
import ToolBar from '../../Components/ToolBar/ToolBar'
import CustomEditor from '../../Modules/Custom_Editor';
import {withImages} from '../../Modules/Utility_Functions';
import LinkElement from '../../Components/LinkElement/LinkElement';
import AlignElement from '../../Components/AlignElement/AlignElement';
import {ListItem,NumberedList} from '../../Components/ListComponents/ListComponents';
import Leaf from '../../Components/Leaf/Leaf';
import Paragraph from '../../Components/Paragraph/Paragraph';
import Image from '../../Components/Image/Image';
import SpeakerBox from '../../Components/SpeakerBox/SpeakerBox';
import './HomePage.css'


const INITIAL_VALUE = [{
    type: 'paragraph',
    children: [{ text: 'There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salteration in some form, by injected humour, or randomised wowhich don`t look even slightly believable. If you are going to use a passage. There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variation passages of Lorem Ipsum available, but the majority have salteration in some form, by injected humour, or randowowhich don`t look even slightly believable. If you are going to use a passage.' }],
  },
]

function HomePage() {
  const [editor] = withImages(useState(() => withReact(createEditor())));
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('#000');

  const renderElement = useCallback(props =>  { // renders block element in slate editor
    switch (props.element.type) {
      case 'numbered-list':
        return <NumberedList {...props} />
      case 'list-item':
        return <ListItem {...props} />
      case 'image':
        return <Image {...props} />
      case 'link':
        return <LinkElement {...props} />
      case 'left':
        return <AlignElement {...props} />
      case 'center':
        return <AlignElement {...props} />
      default:
        return <Paragraph {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => { // renders inline element in slate editor
    return <Leaf {...props} />
  }, [])
  
  const handleKeyDownEvent = (event) => {
    if (!event.ctrlKey){
      return;
    }
    switch(event.key){
      case 'b': {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      }
      case 'i':{
        event.preventDefault();
        CustomEditor.toggleItalicMark(editor);
        break;
      }
      case 'u':{
        event.preventDefault();
        CustomEditor.toggleUnderlineMark(editor);
        break;
      }
      default:
        break;
    }
  }

  const onEmojiClick = (emojiObject,event) => {
    editor.insertText(emojiObject.emoji);
    setShowEmojiPicker(false);
  }

  const handleColorChange = (color) => {
    CustomEditor.toggleColorMark(editor,color.hex);
    setColor(color);
  }

  function getSelected() { // return the text that is selected by the user
    if(window.getSelection) { return window.getSelection(); }
    else if(document.getSelection) { return document.getSelection(); }
    else {
      var selection = document.selection && document.selection.createRange();
      if(selection.text) { return selection.text; }
      return false;
    }
  }

  const handleSelection = (e) => {
    var selection = getSelected();
    console.log(e.clientY,e.clientX)
    const popup = document.getElementById('popup-tag')
    if (selection && selection != '') {
        popup.style.display = 'block';
        popup.style.top = e.clientY + 20 +  'px';
        popup.style.left = e.clientX + 10 + 'px';
    }else{
      popup.style.display = 'none';
    }
  }

  return (
    <React.Fragment>
      <NavBar title={"Data"} logo={"plotLineLogo.svg"} />
      <div className='container'>
        <h1>John Doe Inteview</h1>
        <Slate editor={editor} value={INITIAL_VALUE}>

          <ToolBar customEditor = {CustomEditor} editor = {editor} setShowPicker = {setShowEmojiPicker} setColorPicker = {setShowColorPicker} />
          
          {showEmojiPicker && <Picker pickerStyle = {{
            width:"450px"
          }}
          onEmojiClick = {onEmojiClick}
          />}

          {showColorPicker && 
          <div style={{position:'relative'}}>
            <span style={{
              position:'absolute',
              top:'-10px',
              left:'-10px',
              cursor:'pointer'
            }}
            onClick = {() => setShowColorPicker(false)}
            >x</span>
            <SketchPicker color = {color} onChangeComplete = {handleColorChange} />
          </div>
          }

          <Editable
             renderElement={renderElement}
             renderLeaf={renderLeaf}
             placeholder="Write your thoughts here..."
             spellCheck = {false}
             autoFocus
             onMouseUp={handleSelection}
             onKeyDown={handleKeyDownEvent}
          />
          
          <button id="popup-tag" onClick={(e) => {
            CustomEditor.toggleHighLightMark(editor)
            e.target.style.display = 'none';
          }}>Highlight</button>
          
          <SpeakerBox />
        
        </Slate>
      </div>
    </React.Fragment>
  )
}



export default HomePage

