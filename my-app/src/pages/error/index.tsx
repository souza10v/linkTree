import { Link } from 'react-router-dom'

export const ErrorPage = () => {
    return(
        <div className='flex w-full min-h-screen justify-center items-center flex-col text-white'>
            <h1 className='font-bold text text-8xl mb-10'>404</h1>
            <h1 className='font-bold text-4xl mb-8'>
                Página não encontrada
            </h1>
            <Link className="bg-gray-50/20 py-1 px-4 rounded-md" to="/">
                Voltar a página inicial
            </Link>
        </div>
    )
}