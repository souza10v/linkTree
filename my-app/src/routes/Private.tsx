import { auth } from "../service/firebaseconnection";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface PrivateProps {
    children: ReactNode | any;
}

export const Private = ({ children }: PrivateProps) => {

    const [loading, setLoading ] = useState(true);
    const [signed, setSigned ] = useState(false);

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) { //se ha usuario
                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                }

                localStorage.setItem("@reactlinks", JSON.stringify(userData))
                console.log(user);
                setSigned(true);
                setLoading(false);

            } else {
                console.log("Nao tem usuario logado")
                setSigned(false);
                setLoading(false);
            }
        })

        return () => { //para de verificar se ha usuario logado
            unsub()
        }

    }, [])

    if(loading){ //1
        return <div>Loading</div>
    }

    if(!signed){ //2
        return <Navigate to="/login"/>
    }

    return ( //3
        children
    )
}

// 1o se loading true, exibe a mensagem
//caso nao esteja logado no else, o 2o se é falso retorna para pagina login
// quando loading false(1o if) e signed true(2o if) renderiza children que eh a pagina