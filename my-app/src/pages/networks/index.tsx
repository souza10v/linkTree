import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { FormEvent, useEffect, useState } from "react"

import { db } from '../../service/firebaseconnection'
import {
    setDoc, //cria documento de nome automatico
    doc, // cria item onde tem que se denifir o nome do documento  
    getDoc, //busca documento uma vez
} from 'firebase/firestore'

export const Network = () => {

    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()

        try {
            setDoc(doc(db, "social", "link"), { //colecao social documento link
                facebook: facebook,
                instagram: instagram,
                youtube: youtube
            })

        }
        catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {

        const loadLinks = async () => {
            try {
                const docRef = doc(db, "social", "link")
                const snapshot = await getDoc(docRef)

                if (snapshot.data() !== undefined) {
                    setFacebook(snapshot.data()?.facebook) //se nao houver dados coloca como vazio
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            }
                catch (error) {
                    console.log(error)
                }
            }

        loadLinks()
    }, [])

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">
                Minhas redes sociais
            </h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>

                <label className="text-white font-medium mt-2 mb-2">Link de Facebook</label>
                <Input
                    type="url"
                    placeholder="Digite a url do facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link de Instagram</label>
                <Input
                    type="url"
                    placeholder="Digite a url do instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link de Youtube</label>
                <Input
                    type="url"
                    placeholder="Digite a url do youtube"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button
                    type="submit"
                    className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
                >
                    Salvar links
                </button>

            </form>
        </div>
    )
}



