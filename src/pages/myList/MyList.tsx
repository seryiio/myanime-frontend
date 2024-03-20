import { Suspense, useEffect, useState } from "react";
import { IMyList } from "../../interfaces/MyList";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Userdata } from "../../interfaces/Userdata";
import { getMyListByUserId } from "../../services/MyListService";
import { Link } from "react-router-dom";

const MyList = () => {
    const authUser = useAuthUser<Userdata>();
    const userId = authUser ? authUser.uid : '';
    const userIdString = userId ? userId.toString() : '';

    const [myListByUserId, setmyListByUserId] = useState<IMyList[]>([]);

    useEffect(() => {
        getMyListByUserId(userIdString, setmyListByUserId);
    }, []);

    console.log(myListByUserId);

    return (
        <>
            <div className="flex flex-col h-full gap-y-12 p-4">
                <h1>Mi Lista</h1>
                <Suspense fallback={<div>Cargando...</div>}>
                    {myListByUserId.length > 0 ? (
                        <div className="grid grid-cols-auto-col gap-x-4 gap-y-12">
                            {myListByUserId.map((list) => (
                                <Link key={list.id} to={`/animes/${list.season.animeId}`} className="w-[10em] h-[14em]">
                                    <picture className="w-[10em] h-[10em]">
                                        {list.season && <img src={list.season.image} className="w-full h-full object-fill" alt="" />}
                                    </picture>
                                    <div className="h-5 truncate">
                                        <p>{list.season ? list.season.title_english : ''}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-full">
                            <h2 className="text-white">No has registrado ningún anime</h2>
                        </div>
                    )}
                </Suspense>


            </div >
        </>
    )
}

export default MyList;