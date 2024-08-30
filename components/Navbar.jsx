import React from 'react'

const Navbar = ({activeComponent,setActiveComponent}) => {
  return (
    <div>Navbar
        <button onClick={()=>setActiveComponent('timer')}>Timer</button>
        <button onClick={()=>setActiveComponent('pomodoro')}>Pomodoro</button>
    </div>
  )
}

export default Navbar