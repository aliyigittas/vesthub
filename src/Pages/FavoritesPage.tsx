import HomeCard from "../Components/HomeCard";
import homes from "../Components/TempHomes";

function FavoritesPage() {
    const favoriteHomes =[homes[0], homes[2]]; 

    return (
        <div className="min-h-full place-items-center flex justify-top flex-col bg-backColor px-6 py-6 lg:px-8">
            <h1>Favorites</h1>
            <ListMyHouse homes={favoriteHomes} />
        </div>
    );
}

function ListMyHouse({ homes }: { homes: any[] }) {
    return (
        <div className="flex flex-wrap justify-center items-center h-full bg-inherit">
            {homes.map(home => (<HomeCard home={home} />))}
        </div>
    );
}


export default FavoritesPage;