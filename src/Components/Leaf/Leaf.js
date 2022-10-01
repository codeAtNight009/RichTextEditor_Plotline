import React from 'react'

const Leaf = props => {
    return (
      <span
        {...props.attributes}
        style={{
          fontWeight: props.leaf.bold ? 'bold' : 'normal',
          fontStyle :props.leaf.italic ? 'italic' : 'normal',
          textDecoration : props.leaf.underline ? 'underline' : 'none',
          color : props.leaf.color ? props.leaf.color : 'black',
        }}
      >
        {props.children}
      </span>
    )
}

export default Leaf