import { useEffect, useState } from 'react';
import HomeModal from './HomeModal';
import { HeartTwoTone, HeartFilled, EditFilled } from '@ant-design/icons';
import Cookies from 'js-cookie';
import axios from 'axios';

function HomeCard({ home }: { home: { id: number, title: string, photo: string[] , price: string, type: string, coordinates: {lat: number, lng: number}, ownerMail: string, description: string, address:string, keyFeatures: {fiberInternet: boolean , airConditioner: boolean, floorHeating: boolean, fireplace: boolean, terrace: boolean, satellite: boolean, parquet: boolean, steelDoor: boolean, furnished: boolean, insulation: boolean}, numOfBathroom:number, numOfBedroom:number, numOfRooms:string, area:number, status:string}}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeHovered, setIsLikeHovered] = useState(false);
  var [show, setShow] = useState(false);
  const currentUrl = window.location.href;
  const [clickedHomeId, setClickedHomeId] = useState(null);
  const filteredHomes = home;

  

  
  useEffect(() => {
    if (Cookies.get('loggedIn') === 'true') {
      axios.get('http://localhost:8080/api/checkFavorite', {
        params: {
          houseID: home.id,
          ownerMail: Cookies.get('Email')
        }
      })
      .then(response => {
        console.log("Response:"+response.data);
        if (response.data === true) {
          setIsLiked(true);
        }
      });
    }
  }, [home.id]);
  


  const handleClick = (id:any) =>  {
    setClickedHomeId(id);
  };

  

  return (
    <div className="w-[300px] rounded-lg shadow-sm m-2 bg-white cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      onClick={() => 
       {
        !show && setShow(true);
        window.history.pushState({}, '', show ?  currentUrl : '/home/' + home.id);
        handleClick(home.id);
        console.log(home);
       }
      }>
        
      {<HomeModal key={home.id} show={show} setShow={() => setShow(false)} home={filteredHomes} />}
      <div className="relative" >
        {<img src={home.photo[0]} alt="House" className="w-full rounded-t-lg h-44"/>}
        <div className="absolute bottom-0 right-0 mb-2 mr-2 text-white text-[30px] cursor-pointer" onClick={() => {}}> 
        <div className="rounded-full bg-white w-11 h-11 flex items-center justify-center bg-transparent"
          onClick={
            (e) => {

              if (Cookies.get('loggedIn') === 'true') {
                if (home.ownerMail === Cookies.get("Email")) {
                  window.location.href = '/editListing/' + home.id;
                } else {
                  //setIsLiked(!isLiked);
                  if (!isLiked) {
                    axios.post('http://localhost:8080/api/addFavorite', {houseID: home.id, ownerMail: Cookies.get("Email")})
                    .then(response => {
                      console.log(response.data);
                      if (response.data === true) {
                        setIsLiked(true);
                      }
                    });
                  }else
                  {
                    axios.post('http://localhost:8080/api/removeFavorite', {houseID: home.id, ownerMail: Cookies.get("Email")})
                    .then(response => {
                      console.log(response.data);
                      if (response.data === true) {
                        setIsLiked(false);
                      }
                    });
                  }
                }
              } else {
                window.location.href = '/login';
                window.location.reload();
              }
              e.stopPropagation();
              
            }
          }
          onMouseEnter={() => setIsLikeHovered(true)}
          onMouseLeave={() => setIsLikeHovered(false)}
          >
          
          {home.ownerMail === Cookies.get("Email") ? ( // Check if the owner is 
              isLiked ? <EditFilled className='text-[#6fa3f7]' /> : isLikeHovered ? <EditFilled className='text-[#6fa3f7]' /> : <EditFilled className='text-[#e2e9ef]' />
              ) : ( //if the owner is not matching, use default heart icons
              isLiked ? <HeartFilled className='text-red-500'/> : isLikeHovered ? <HeartTwoTone twoToneColor={'#ef4444'}/> : <HeartTwoTone twoToneColor={'#9ca3af'}/>)
          }
        </div>
      </div>
        <div className={`absolute top-1 left-1 p-1 px-2 ${home.type=="Sale" ? "bg-green-500": "bg-button-secondary"} rounded-lg shadow-md flex items-center justify-center`}> {/*eslint-disable-line eqeqeq*/}
          <span className="text-white font-bold text-[15px]">
            {home.type}
          </span>
        </div>

        { (window.location.href.includes('/myListings') || window.location.href.includes('/favorites')) && 
          <div className={`absolute top-1 right-1 p-1 px-2 ${home.status=="Available" ? "bg-green-500": "bg-red-600"} rounded-lg shadow-md flex items-center justify-center`}> {/*eslint-disable-line eqeqeq*/}
          <span className="text-white font-bold text-[15px]">
            {home.status}
          </span>
        </div>
        }
      </div>
      <div className="px-4 py-2">
        <div className="font-bold text-xl text-ellipsis line-clamp-3">{home.title}</div>
        <label className="font-bold text-[14px]">{
          home.type === "Sale" ? home.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₺" : home.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₺/month"
        }</label>
        <div className="flex flex-row gap-2 text-[14px]">
          <div className="">
            <span className="pr-1 font-bold">{home.numOfBedroom}</span>bds
          </div>
          <span className="text-gray-500">|</span>
          <div className="">
            <span className="pr-1 pl-2 font-bold">{home.numOfBathroom}</span>ba
          </div>
          <span className="text-gray-500">|</span>
          <div className="">
            <span className="pr-1 pl-2 font-bold">{home.area}</span>m2
          </div>
        </div>
        <div className="">
          <span className="text-gray-500 text-[14px]">
            {home.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
