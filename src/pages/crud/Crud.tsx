import { Link } from "react-router-dom";

const Crud = () => {
    return (
        <div className="crud">
            <div className="flex justify-center items-center flex-col gap-4 h-max p-10 cruds">
                <div className="cruds__title">
                    <h1>CRUDs</h1>
                </div>
                <div className="grid grid-cols-auto-col gap-8 w-full">
                    <Link className="p-10 rounded-xl bg-slate-700 text-white" to={'books'}>Libros</Link>
                    <Link className="p-10 rounded-xl bg-slate-700 text-white" to={'animes'}>Animes</Link>
                    <Link className="p-10 rounded-xl bg-slate-700 text-white" to={'genres'}>Generos</Link>
                    <Link className="p-10 rounded-xl bg-slate-700 text-white" to={'seasons'}>Temporadas</Link>
                    <Link className="p-10 rounded-xl bg-slate-700 text-white" to={'/'}>Episodios</Link>
                </div>
            </div>
        </div>
    )
}

export default Crud;