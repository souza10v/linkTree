import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { FormEvent, useState, useEffect } from "react"

import { FiTrash } from "react-icons/fi";
import { db } from "../../service/firebaseconnection";

import {
    addDoc, //id aleatorio
    collection, //
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'

interface LinkProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

export const Admin = () => {

    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")
    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => {
        const linkRef = collection(db, "links");
        const queryRef = query(linkRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {

            let lista = [] as LinkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista)
        })

        return () => {
            unsub();//remove os olheiros que estao sendo executados
        }

    }, [])
    
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        if (nameInput === "" || urlInput === "") {
            alert("Preencha todos os campos")
            return;
        }

        try {
            addDoc(collection(db, "links"), {
                name: nameInput,
                url: urlInput,
                bg: backgroundColorInput,
                color: textColorInput,
                created: new Date()
            })
            console.log(`cadastrado com sucesso`)
            setNameInput("")
            setUrlInput("")
        } catch (error) {
            console.log(`Error ao cadastrador no banco ${error}`)
        }
    }

    const handleDeleteLink = async (id: string) => {
        try {
            const docRef = doc(db, "links", id)
            await deleteDoc(docRef)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2" onSubmit={handleRegister}>
            <Header />

            <form className="flex flex-col mt-3 mb-3 w-full max-w-xl">

                <label className="text-white font-medium mt-2 mb-2">
                    Nome do link
                </label>
                <Input
                    placeholder="Digite o nome do link"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">
                    URL do link
                </label>
                <Input
                    placeholder="Digite o nome a url"
                    value={urlInput}
                    type="url"
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex items-center flex-center justify-center my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">
                            Cor do link
                        </label>
                        <input
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}>
                        </input>
                    </div>

                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">
                            Background Link
                        </label>
                        <input
                            type="color"
                            value={backgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}>
                        </input>
                    </div>
                </section>

                {nameInput !== '' && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-2">Link atual</label>
                        <article
                            className="w-11/12 max-wlg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
                        >
                            <p style={{ color: textColorInput }}>
                                {nameInput}
                            </p>
                        </article>
                    </div>
                )}

                <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus links
            </h2>

            {links.map((link, index) => (
                <article
                    key={link.id}
                    className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                    style={{  background: link.bg, color: link.color }} //, 
                >
                    <p>{link.name}</p>
                    <div>
                        <button
                            className="border border-dashed p-1 rounded "
                            onClick={ () => handleDeleteLink(link.id)}
                        >
                            <FiTrash size={18} color={link.color} />

                        </button>
                    </div>
                </article>
            ))}

        </div>
    )
}