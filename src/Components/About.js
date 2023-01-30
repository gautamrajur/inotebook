import React, {useContext, useEffect} from 'react'
import noteContext from '../Context/Notes/noteContext'

function About() {
  const a = useContext(noteContext)
  useEffect(()=>{
    a.update();
  })
  return (
    <div>
      <h1> This is About {a.state.name} and he's in class {a.state.class}</h1>
    </div>
  )
}

export default About
