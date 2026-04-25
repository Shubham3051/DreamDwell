import React from 'react'
import '../GT/Galtitle.css'

const Galtitle = ({heading , subhead}) => {
  return (
    <>
    <div className='titlewe'>
      <h2 className='d'>{heading}</h2>
      <p className='s'>{subhead}</p>
    </div>
    </>
  )
}

export default Galtitle
