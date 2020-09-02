import React from 'react'
import Loader from 'react-loader-spinner'

const LoadingAnimation = () => {
    return (
        <div style={{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Loader
                type="Oval"
                color="#eebd37"
                height={75}
                width={75}
            />
        </div>
    )
}

export default LoadingAnimation