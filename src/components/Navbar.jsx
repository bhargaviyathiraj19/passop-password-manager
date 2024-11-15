import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className='mycontainer flex  justify-between px-4 py-5 items-center h-14'>

                <div className='logo font-bold text-white text-2xl'>

                    <span className="text-green-700"> &lt;</span>
                    <span>Pass</span>
                    <span className="text-green-700">OP/&gt;</span>
                    
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className="hover:font-bold" href="#">Home</a>
                        <a className="hover:font-bold" href="#">About</a>
                        <a className="hover:font-bold" href="#">Contact</a>
                    </li>
                </ul> */}
                <button className='h-12 w-51 text-white bg-green-700 my-2 mx-1 rounded-full flex justify-between items-center ring-white ring-1'>
                    <img className=" p-5 w-20" src="github.png" alt="github logo" />
                    <span className=' font-bold px-3'> GitHub </span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
