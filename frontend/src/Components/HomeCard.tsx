import { useState } from 'react';
import HomeModal from './HomeModal';
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';
import homes from './TempHomes';

function HomeCard({ home }: { home: { id: number, name: string, photo: any , price: string, type: string, coordinates: {lat: number, lng: number}} }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeHovered, setIsLikeHovered] = useState(false);
  var [show, setShow] = useState(false);
  const currentUrl = window.location.href;
  const [clickedHomeId, setClickedHomeId] = useState(null);

  const handleClick = (id:any) => {
    setClickedHomeId(id);
  };

  return (
    <div className="w-[300px] rounded-lg shadow-sm m-2 bg-white cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      onClick={() => 
       {
        !show && setShow(true);
        window.history.pushState({}, '', show ?  currentUrl : '/home/' + home.id);
        handleClick(home.id);
       }
      }>
      {homes.filter((home) => home.id === clickedHomeId).map((home) => (
        <HomeModal key={home.id} show={show} setShow={() => setShow(false)} home={home} />
      ))}
      <div className="relative" >
        <img src={home.photo} alt="House" className="w-full rounded-t-lg h-44"/>
        <div className="absolute bottom-0 right-0 mb-2 mr-2 text-white text-[30px] cursor-pointer" onClick={() => {}}> 
        <div className="rounded-full bg-white w-11 h-11 flex items-center justify-center bg-transparent"
          onClick={
            (e) => {
              setIsLiked(!isLiked);
              e.stopPropagation();
            }
          }
          onMouseEnter={() => setIsLikeHovered(true)}
          onMouseLeave={() => setIsLikeHovered(false)}
          >
        {isLiked ? <HeartFilled className='text-red-500'/> : isLikeHovered ? <HeartTwoTone twoToneColor={'#ff0000'}/> : <HeartTwoTone twoToneColor={'#9ca3af'}/>}
        </div>
      </div>
        <div className={`absolute top-1 left-1 p-1 px-2 ${home.type=="Sale" ? "bg-green-500": "bg-button-secondary"} rounded-lg shadow-md flex items-center justify-center`}> {/*eslint-disable-line eqeqeq*/}
          <span className="text-white font-bold text-[15px]">
            {home.type}
          </span>
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="font-bold text-xl">{home.name}</div>
        <label className="font-bold">₺{home.price}</label>
        <div className="flex flex-row gap-2">
          <div className="">
            <span className="pr-1 font-bold">5</span>bds
          </div>
          <span className="text-gray-500">|</span>
          <div className="">
            <span className="pr-1 pl-2 font-bold">3</span>ba
          </div>
          <span className="text-gray-500">|</span>
          <div className="">
            <span className="pr-1 pl-2 font-bold">2,327</span>m2
          </div>
        </div>
        <div className="">
          <span className="text-gray-500 text-[14px]">
            9501 Shore Dr Unit D235, Myrtle Beach, SC 29572
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
