import React from "react";
import HomeCard from "../Components/HomeCard";
import Cookies from "js-cookie";
import homes from "../Components/TempHomes";
import { PlusOutlined } from "@ant-design/icons";

function MyListingsPage() {
    const owner = Cookies.get("Name"); // Define the owner
    const baranHomes = homes.filter(home => home.owner === owner); // Filter homes owned by 'Baran'
    return (
        <div className="flex flex-col items-center h-full bg-inherit p-4">
            <h1>My Listings</h1>
            <button
                className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover"
                onClick={() => (window.location.href = "/addHome")}
            >
                <div className="flex items-center gap-2">
                    <PlusOutlined />
                    <span>Add a New Listing</span>
                </div>
            </button>
            <ListMyHouse homes={baranHomes} /> {/* Pass filtered homes to ListMyHouse component */}
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

export default MyListingsPage;