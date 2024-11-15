import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'> 
            <div className='logo font-bold text-white text-2xl  '>

                <span className="text-green-700"> &lt;</span>
                <span>Pass</span>
                <span className="text-green-700">OP/&gt;</span>

            </div>
            <div className='flex justify-center items-center'>
                Created with <img className='px-5 h-5' src="heart.png" alt="" /> Web Dev
            </div>
        </div>

    )
}

export default Footer
