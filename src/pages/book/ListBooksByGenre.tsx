// import { Suspense, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { BooksByGenre } from "../../interfaces/BooksByGenre";



// const id = useParams().id;

// const [listBooksByGenre, setListBooksByGenre] = useState<BooksByGenre | undefined>(undefined);

// useEffect(() => {
//     getGenres(setListGenres);
// }, []);

const ListBooksByGenre = () => {
    return (
        <>
            {/* <div className="flex flex-col h-full gap-y-12 p-4">
                <h1 className="text-center">{listBooksByGenre?.name}</h1>
                <Suspense fallback={<div>Cargando...</div>}>
                    <div className="grid grid-cols-auto-col gap-x-4 gap-y-12">
                        {
                            listBooksByGenre?.animes && listAnimesByGenre.animes.length > 0 ? (
                                listBooksByGenre?.animes.map((anime) => (
                                    <Link to={`/animes/${anime.id}`} key={anime.id} className="w-[10em] h-[14em]">
                                        <picture className="w-[10em] h-[10em]">
                                            <img src={anime.image} className="w-full h-full object-fill" alt="" />
                                        </picture>
                                        <div className="h-5 truncate">
                                            <p>{anime.title_english}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="flex justify-center items-start">
                                    <h2 className="text-white">No hay animes disponibles</h2>
                                </div>
                            )
                        }
                    </div>
                </Suspense>
            </div> */}
        </>
    )
}

export default ListBooksByGenre;