import { Suspense, useEffect, useState } from "react";
import { getAnimesByGenre } from "../../services/GenreService";
import { Link, useParams } from "react-router-dom";
import CardAnime from "../../components/card/CardAnime";

// const ListAnimesByGenre = () => {

//     const id = useParams().id;

//     const [listAnimesByGenre, setListGenresByGenre] = useState<AnimesByGenre | undefined>(undefined);
//     useEffect(() => {
//         getAnimesByGenre(id, setListGenresByGenre);
//     }, []);
//     return (
//         <div className="flex flex-col h-full gap-y-12 p-4">
//             <h1 className="text-center">{listAnimesByGenre?.name}</h1>
//             <Suspense fallback={<div>Cargando...</div>}>
//                 <div className="grid grid-cols-auto-col gap-x-4 gap-y-12">
//                     {
//                         listAnimesByGenre?.animes && listAnimesByGenre.animes.length > 0 ? (
//                             listAnimesByGenre?.animes.map((anime) => (
//                                 <Link to={`/animes/${anime.id}`} key={anime.id} className="w-[10em] h-[14em]">
//                                     <picture className="w-[10em] h-[10em]">
//                                         <img src={anime.image} className="w-full h-full object-fill" alt="" />
//                                     </picture>
//                                     <div className="h-5 truncate">
//                                         <p>{anime.title_english}</p>
//                                     </div>
//                                 </Link>
//                             ))
//                         ) : (
//                             <div className="flex justify-center items-start">
//                                 <h2 className="text-white">No hay animes disponibles</h2>
//                             </div>
//                         )
//                     }
//                 </div>
//             </Suspense>
//         </div>
//     )
// }

// export default ListAnimesByGenre;