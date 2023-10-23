import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/Input"
import { useState, FormEvent } from "react"

import { auth } from '../../service/firebaseconnection'
import { signInWithEmailAndPassword } from "firebase/auth"

export const Login = () => {

    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const Navigate = useNavigate()

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if (email === "" || password === ""){
            alert("Preencha todos os campos")
            return;
        }

        try{
            signInWithEmailAndPassword(auth, email, password)
            console.log("logado com sucesso")
            Navigate("/admin", {replace: true})

        }catch(error){
            console.log(`Erro ao fazer o login ${error}`)
        }

        console.log({
            email: email,
            password: password
        })
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Action
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-4">
                <Input 
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white">
                    Acessar
                </button>
            </form>


        </div>
    )
}