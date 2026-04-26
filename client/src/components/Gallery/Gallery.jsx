import React from 'react'
import './Gallery.css'
import { useNavigate } from "react-router-dom";
import gallery_1 from '../../assets/gallery-1.avif'
import gallery_2 from '../../assets/gallery-2.jpg'
import gallery_3 from '../../assets/gallery-3.jpg'
import gallery_4 from '../../assets/gallery-4.png'
import white_arrow from '../../assets/white-arrow.png'

const Gallery = () => {
  
  const navigate = useNavigate();

  return (
    <>
    <div className='gallery '>
        <div className="gallery1">
            <img src={gallery_1} alt='photo 1' className='z'/>
            <img src={gallery_2} alt='photo 2' className='z'/>
            <img src={gallery_3} alt='photo 3' className='z'/>
            <img src={gallery_4} alt='photo 4' className='z'/>
        </div>
        <button onClick={() => navigate("/properties")} className='btn  dark-btn'>See More Here <img src={white_arrow} className=''/></button> 
    </div>
    </>
  )
}
export default Gallery
