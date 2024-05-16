import { useState } from "react";
import HomeModal from "../Components/HomeModal";
import TempHomes from "../Components/TempHomes";


function AdminPanel() {
    const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col items-center justify-top min-h-full bg-inherit">
    <HomeModal show={show} setShow={() => setShow(false)} home={TempHomes[0]} />

        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <label className="text-lg mt-4">Waiting for listing approval</label>
        <div className="flex flex-wrap justify-center items-start">
        {TempHomes.map((Home) => (
            <div className="flex flex-col w-full max-w-[600px] p-4">
                <div className="flex flex-col w-full p-4 bg-gray-300 rounded-2xl space-y-3">
                    <div className="flex flex-row space-x-2">
                        <img src={Home.photo[0]} alt="placeholder" className="w-24 h-24 rounded-lg cursor-pointer" onClick={() => setShow(true)} />
                        <div className="flex flex-col">
                            <label className="text-lg font-bold">{Home.name}</label>
                            <label className="text-sm">{Home.address}</label>
                            <label className="text-sm">{Home.price}</label>
                            <label className="text-sm text-ellipsis line-clamp-3">{Home.description}</label>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <button className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500" type="button">
                            Approve
                        </button>
                        <button className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500" type="button">
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        ))}
        </div>
    </div>
  );
}

/*

{<div className="flex flex-col w-full max-w-[600px] p-4">
            <div className="flex flex-row space-x-2">
                <div className="flex flex-col w-full p-4 bg-gray-300 rounded-2xl space-y-3">
                    <div className="flex flex-row space-x-2">
                        <img src={Houseimg} alt="placeholder" className="w-24 h-24 rounded-lg" />
                        <div className="flex flex-col">
                            <label className="text-lg font-bold">{Home.name}</label>
                            <label className="text-sm">{Home.address}</label>
                            <label className="text-sm">{Home.price}</label>
                            <label className="text-sm">{Home.description}</label>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <button className="flex w-full justify-center rounded-md bg-button-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-primaryHover" type="button">
                            Approve
                        </button>
                        <button className="flex w-full justify-center rounded-md bg-button-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-primaryHover" type="button">
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>  } 

*/


export default AdminPanel;
