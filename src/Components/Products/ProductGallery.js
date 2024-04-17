import React from 'react'



const ProductGallery = ({images}) => {
    
    return (
        <div className='d-flex justify-content-center'>
            <img className='img-product-details' src={images} alt="ass"/>
        </div>
    )
}

export default ProductGallery
