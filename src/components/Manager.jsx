import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)

    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {

        toast('copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("eye.png")) {
            ref.current.src = "cross.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "eye.png" //eyecross icon is needed but not availabale

        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            let res = await fetch("http://localhoast:3000/", {
                method: "POST", headers: { "Content-Type": "application/json" }
                , body: JSON.stringify({ ...form, id: uuidv4() })
            })
            //localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            //console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast(' Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast(' Error: Password not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete the password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http://localhoast:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" }
                , body: JSON.stringify({ ...form, id })
            })
            //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />


            <div className="relative inset-0 -z-10 h-full w-full">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
            </div>
            <div className="p-2 md:p-0 md:mycontainer min-h-[87.5vh] mb-10">
                {/* Heading */}
                <h1 className='text-3xl md:text-4xl font-bold text-center'>
                    <span className="text-green-700"> &lt;</span>
                    <span>Pass</span>
                    <span className="text-green-700">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-base md:text-lg text-center'>Your password Manager</p>

                {/* Form Section */}
                <div className="flex flex-col p-4 text-black gap-6 md:gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-700 w-full p-3 md:p-4 py-1' type="text" name='site' id='S' />

                    <div className='flex flex-col md:flex-row w-full justify-between gap-6 md:gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-700 w-full p-3 md:p-4 py-1' type="text" name='username' id='U' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-green-700 w-full p-3 md:p-4 py-1' type="password" name='password' id='P' />
                            <span className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='gap-2 items-center justify-center flex bg-green-600 rounded-full px-6 md:px-8 py-2 w-fit hover:bg-green-500 border-2 border-green-800'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Save
                    </button>
                </div>

                {/* Passwords Section */}
                <div className="passwords">
                    <h2 className='font-bold text-xl md:text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full rounded-md overflow-hidden">
                                <thead className=' bg-green-800 text-white'>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-100'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-2 py-3 md:px-10 border border-white">
                                                <div className="flex items-center justify-between">
                                                    <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                                                    <div className="lordiconcopy cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                        <lord-icon src="https://cdn.lordicon.com/ujxzdfjx.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-3 md:px-10 border border-white">
                                                <div className="flex items-center justify-between">
                                                    <span>{item.username}</span>
                                                    <div className="lordiconcopy cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                        <lord-icon src="https://cdn.lordicon.com/ujxzdfjx.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-3 md:px-10 border border-white">
                                                <div className="flex items-center justify-between">
                                                    <span>{item.password}</span>
                                                    <div className="lordiconcopy cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                        <lord-icon src="https://cdn.lordicon.com/ujxzdfjx.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center px-2 py-3 md:px-10 border border-white">
                                                <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon src="https://cdn.lordicon.com/vhyuhmbl.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon src="https://cdn.lordicon.com/hjbrplwk.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                </div>
            </div>

        </>
    )
}

export default Manager
