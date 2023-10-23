import { useEffect, useState } from "react"
import { Social } from "../../components/Social"
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { db } from "../../service/firebaseconnection"
import {
    getDocs, //lista de items
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'

interface LinkProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

interface SocialLinksProps {
    facebook: string,
    youtube: string,
    instagram: string,
}

export const Home = () => {

    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(() => {
        const loadLinks = async () => {
            try {
                const linksRef = await collection(db, "links")
                const queryRef = query(linksRef, orderBy("created", "asc"))

                const snapshot = getDocs(queryRef)

                let lista = [] as LinkProps[];

                (await snapshot).forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().bg,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })
                
                setLinks(lista)

            } catch (error) {
                console.log(error)
            }
        }
       

        loadLinks();
    }, [])

    useEffect(() =>{

        const loadSocialLinks = async () => {
            try {
                const loadSocialLinkRef = await doc(db, "social", "link")
                const snapshotsocial = getDoc(loadSocialLinkRef)

                if((await snapshotsocial).data() !== undefined){
                    setSocialLinks({
                        facebook: (await snapshotsocial).data()?.facebook,
                        instagram: (await snapshotsocial).data()?.instagram,
                        youtube: (await snapshotsocial).data()?.youtube
                    })
                }

            } catch(error){
                console.log(error)
            }
        }

        loadSocialLinks()

    }, [])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Action Link</h1>
            <span className="text-gray-50 mb-5 mt-20">Veja meus links</span>

            <main className="flex flex-col w-11/12 max-w-x1 text-center">
                {links.map((link) => (
                    <section 
                    style={{backgroundColor: link.bg}}
                    className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
                    key={link.id}
                    >
                    <a href={link.url} target="_blank">
                        <p 
                        className="text-base md:text-lg"
                        style={{color: link.color}}>
                            {link.name}
                        </p>
                    </a>
                </section>
                ))}

                { socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                    <Social url={socialLinks?.facebook}> 
                    <FaFacebook size={35} color="FFF" />
                    </Social>

                    <Social url={socialLinks?.instagram}>
                    <FaInstagram size={35} color="FFF" />
                    </Social>

                    <Social url={socialLinks?.youtube}> 
                    <FaYoutube size={35} color="FFF" />
                    </Social>
                </footer>
                )}


            </main>
        </div>
    )
}