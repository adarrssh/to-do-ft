import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import './Spinner.css'

const Spinner = () => {
    return (
        <div className='spin-div'>

            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    )
}

export default Spinner