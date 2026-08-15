import React from 'react'
import '../styles/loader.scss'

const Loader = ({ label = 'Loading...' }) => {
    return (
        <main className='app-loader'>
            <div className='loader-con'>
                <div style={{ '--i': 0 }} className='pfile'></div>
                <div style={{ '--i': 1 }} className='pfile'></div>
                <div className='pfile' style={{ '--i': 2 }}></div>
                <div className='pfile' style={{ '--i': 3 }}></div>
                <div className='pfile' style={{ '--i': 4 }}></div>
                <div className='pfile' style={{ '--i': 5 }}></div>
            </div>
            <p className='app-loader__label'>{label}</p>
        </main>
    )
}

export default Loader
