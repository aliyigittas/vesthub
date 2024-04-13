import { useState } from "react";
import { Select } from 'antd';
import HomeCard from "../Components/HomeCard";
import homes from "../Components/TempHomes";
import MultiMarkerMap from "../Components/MultiMarkerMap";
import { UserOutlined } from '@ant-design/icons';


export const currentUrl = window.location.href; //output is like http://localhost:3000/search/istanbul&type=sale
const searchParamMatch = currentUrl.match(/\/search\/([^&]*)/);
const typeParamMatch = currentUrl.match(/&type=([^&]*)/);
const typeValue = typeParamMatch && typeParamMatch[1] ? typeParamMatch[1] : 'sale'; //sale is default
const searchValue = searchParamMatch && searchParamMatch[1] ? searchParamMatch[1] : '';
var searchtext = decodeURIComponent(searchValue);

console.log(typeValue);


const initialDisplayedHouses = [homes[0], homes[1], homes[2], homes[3]];

//const dummyArray = [0,1,2,3];

const filter = [
  {
    label: 'Item 1',
    value: 'val1',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Item 2',
    value: 'val2',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: 'Item 3',
    value: 'val3',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: 'Item 4',
    value: 'val4',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
  },
];

const anotherfilter = [
  {
    label: 'Item 5',
    value: 'val5',
  },
  {
    label: 'Item 6',
    value: 'val6',
  },
  {
    label: 'Item 7',
    value: 'val7',
  },
  {
    label: 'Item 8',
    value: 'val8',
  },
];


/*
const prices: MenuProps["items"] = [
  {
    key: '1',
    label: (
      <p>
        0-100,000
      </p>
    ),
  },
  {
    key: '2',
    label: (
      <p>
        100,000-200,000
      </p>
    ),
  },
  {
    key: '3',
    label: (
      <p>
        200,000-300,000
      </p>
    ),
  },
];
*/


function SearchPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [displayedHouses, setDisplayedHouses] = useState(initialDisplayedHouses);
  const [showMap, setShowMap] = useState(false);
  //const url = new URL(currentUrl);
  //const searchQuery = url.searchParams.get('query');
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    setShowMap(!isChecked);
  };

  const handleShowAllHouses = () => {
    setDisplayedHouses(homes);
  };


  //backendden liste alınacak burada

  return (
    <div className= "bg-backColor p-6 flex flex-row">
      <div className="sticky top-20 w-fit h-fit">
        <FilterHouses />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <div className="pt-2 pl-5 flex flex-row justify-between">
          <div>
            <p className="text-[30px] font-bold text-black">Search Results for: {searchtext}</p>
            <p className="text-sm text-gray-600">10 results found</p>
          </div>
          <MapSwitcher />
        </div>
        <div className="flex justify-around items-center w-full h-full">
        {showMap ? <div className="px-6 w-full h-full relative">
          <MultiMarkerMap homes={displayedHouses} />
          </div>:
          
            <div className="flex flex-wrap px-4 gap-3 text-left justify-center">
              {displayedHouses.map((house, index) => (
                <HomeCard key={index} home={house}/>
              ))}
            </div>
        }
        </div>
        <div className="flex justify-center">
          <button className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" onClick={() => handleShowAllHouses()}>Show All Houses</button>
        </div>
      </div>
    </div>
  );

  function FilterHouses() {
    
    return <div className="w-[350px] bg-button-primary flex flex-col space-y-4 p-4 items-center shadow-xl rounded-lg">

      
      <form className="w-full relative" action="#" method="POST" onSubmit={(e) => { getSearchText(e, typeValue); } }>
        <input type="search" id="search" className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder={searchValue} onChange={(e) => { searchtext = e.target.value}} defaultValue={searchtext} required/>
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 top-2.5 bg-button-primary hover:bg-button-primaryHover focus:outline-none font-medium rounded-lg text-sm px-4 py-2"><div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"><svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" /></svg></div></button>
      </form>
      
      <div className="flex flex-row justify-between w-full">
      <label className="self-center text-white">Filter 1</label>
        <Select
          defaultValue={"Not Selected"}
          options={filter}
          style={{ width: "80%" }}
        />
      </div>

      <div className="flex flex-row justify-between w-full">
        <label className="self-center text-white">Filter 2</label>
        <Select
        //change border color on focus
          onFocus={() => console.log("focus")}
          defaultValue={"Not Selected"}
          options={anotherfilter}
          style={{ width: "80%"}}
        />
      </div>
    </div>;
  }

  function MapSwitcher(){
    return (
    <div className="flex items-center">
        <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only' />
          <span className='label flex items-center text-sm font-medium text-gray-600'>
            List
          </span>
          <span
            className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1  transition-colors duration-300 ${isChecked ? 'bg-button-primary' : 'bg-[#CCCCCE]'}`}>
            <span
                className={`dot h-6 w-6 rounded-full shadow-lg bg-white ${isChecked ? 'translate-x-[28px]' : 'translate-x-0'}`}></span>
            </span>
          <span className='label flex items-center text-sm font-medium text-gray-600'>Map</span>
        </label>
    </div>
      );
  }

  function getSearchText(event: React.FormEvent<HTMLFormElement>, selectedValue: string) {
    var delimeter = "&";
    event.preventDefault();
    const search = document.getElementById('search') as HTMLInputElement;
    window.location.href = '/search/' + search.value + delimeter + 'type=' + selectedValue;
    return search.value;
  }
}

export default SearchPage;



/*

function MapSwitcher(){
    return (
    <div className="flex items-center">
        <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only' />
          <span className='label flex items-center text-sm font-medium text-gray-600'>
            List
          </span>
          <span
            className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1  transition-colors duration-300 ${isChecked ? 'bg-button-primary' : 'bg-[#CCCCCE]'}`}>
            <span
                className={`dot h-6 w-6 rounded-full shadow-lg bg-white ${isChecked ? 'translate-x-[28px]' : 'translate-x-0'}`}></span>
            </span>
          <span className='label flex items-center text-sm font-medium text-gray-600'>Map</span>
        </label>
    </div>
      );
  }

*/
