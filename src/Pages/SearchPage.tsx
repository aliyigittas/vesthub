import { useState } from "react";
import HomeCard from "../Components/HomeCard";
import homes from "../Components/TempHomes";
import MultiMarkerMap from "../Components/MultiMarkerMap";


export const currentUrl = window.location.href; 
const searchParamMatch = currentUrl.match(/\/search\/([^&]*)/);
const typeParamMatch = currentUrl.match(/&type=([^&]*)/);
const typeValue = typeParamMatch && typeParamMatch[1] ? typeParamMatch[1] : 'sale'; //sale is default
const searchValue = searchParamMatch && searchParamMatch[1] ? searchParamMatch[1] : '';
var searchtext = decodeURIComponent(searchValue);

console.log(typeValue);


const initialDisplayedHouses = [homes[0], homes[1], homes[2], homes[3], homes[4], homes[5]];

//const dummyArray = [0,1,2,3];

const homeType = [
  {
    key: '1',
    label: 'Not Selected',
    value: 'Not Selected',
  },
  {
    key: '2',
    label: 'Apartment',
    value: 'Apartment',
  },
  {
    key: '3',
    label: 'Villa',
    value: 'Villa',
  },
  {
    key: '4',
    label: 'Studio',
    value: 'Studio',
  },
];

const roomCount = [
  {
    key: '1',
    label: 'NotSelected',
    value: 'NotSelected',
  },
  {
    key: '2',
    label: '1+1',
    value: '1+1',
  },
  {
    key: '3',
    label: '2+1',
    value: '2+1',
  },
  {
    key: '4',
    label: '3+1',
    value: '3+1',
  },
  {
    key: '5',
    label: '4+1',
    value: '4+1',
  },
  {
    key: '6',
    label: '5+1',
    value: '5+1',
  },
];

function SearchPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [displayedHouses, setDisplayedHouses] = useState(initialDisplayedHouses);
  const [showMap, setShowMap] = useState(false);

  var filter1 = 'Not Selected';
  var filter2 = 'Not Selected';
  var minPrice = -1;
  var maxPrice = -1;
  var listingDate = "Not Selected"; //eslint-disable-line no-unused-vars


  if (window.location.href.includes('houseType')) {
    filter1 = window.location.href.split('houseType=')[1].split('&')[0];
    console.log(filter1);
  }

  if (window.location.href.includes('filter2')) {
    filter2 = window.location.href.split('filter2=')[1].split('&')[0];
    console.log(filter2);
  }

  if (window.location.href.includes('minPrice')) {
    minPrice = parseInt(window.location.href.split('minPrice=')[1].split('&')[0]);
    console.log(minPrice);
  }

  if (window.location.href.includes('maxPrice')) {
    maxPrice = parseInt(window.location.href.split('maxPrice=')[1].split('&')[0]);
    console.log(maxPrice);
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    setShowMap(!isChecked);
  };

  const handleShowAllHouses = () => {
    setDisplayedHouses(homes);
  };


  //backendden liste alınacak burada

  return (
    <div className= "bg-inherit p-6 flex min-h-full flex-row">
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
        <div className="flex items-start justify-center w-full h-full">
        {showMap ? 
          <div className="px-6 w-full h-full relative">
            <MultiMarkerMap homes={displayedHouses} />
          </div> :
          <div className="flex flex-wrap justify-center">
            {displayedHouses.map((house, index) => (<HomeCard key={index} home={house} />))}
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
    //tüm filtreleri toplayıp tek formda gönder ve url'i öyle değiştir
    return <div className="w-[350px] bg-button-primary flex flex-col space-y-4 p-4 items-start shadow-xl rounded-lg">
      <input type="search" id="search" className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder={searchValue} onChange={(e) => { searchtext = e.target.value}} defaultValue={searchtext} required/>
      <div className="flex flex-row w-full justify-between">
      <label className="text-white items-center flex">House Type</label>
        <select className="select select-text bg-gray-50 text-gray-900 text-sm rounded-lg p-2 flex w-full max-w-[200px]" defaultValue={filter1} onChange={(e) => {
          addSearchFilter('houseType', e.target.value);
          }}
          >
            {homeType.map((item) => (
              <option key={item.key}>{item.label}</option>
            ))}
        </select>
      </div>
      <div className="flex flex-row w-full justify-between">
      <label className="text-white items-center flex">Room Count</label>
        <select className="select select-text bg-gray-50 text-gray-900 text-sm rounded-lg p-2 flex w-full max-w-[200px]" defaultValue={filter2} onChange={(e) => {
          addSearchFilter('filter2', e.target.value);
          }}
          >
            {roomCount.map((item) => (
              <option key={item.key}>{item.label}</option>
            ))}
        </select>
      </div>

      <div className=" flex flex-row w-full justify-between">
        <label className="text-white">Price (₺)</label>
        <div className="flex gap-2 flex-row">
          <input type="number" id="minPrice" className="max-w-[96px] p-1 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder="Min" min={0}/>
          <input type="number" id="maxPrice" className="max-w-[96px] p-1 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder="Max" min={0}/>
        </div>
      </div>

      <div className="w-full space-y-2">
        <label className="self-center text-white">Listing Date</label>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <input type="radio" id="last24hours"className="w-5 h-5 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary accent-button-secondary" name="selector" />
            <label htmlFor="last24hours" className="text-white">Last 24 hours</label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input type="radio" id="last3days" className="w-5 h-5 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary accent-button-secondary" name="selector" />
            <label htmlFor="last3days" className="text-white">Last 3 Days</label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input type="radio" id="last1week" className="w-5 h-5 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary accent-button-secondary" name="selector" />
            <label htmlFor="last1week" className="text-white">Last 1 Week</label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input type="radio" id="allTime" className="w-5 h-5 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary accent-button-secondary" name="selector" defaultChecked/>
            <label htmlFor="allTime" className="text-white">All Time</label>
          </div>
        </div>
      </div>
      
      <button className="text-white bg-button-secondary hover:bg-button-secondaryHover focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="inset-y-0 start-0 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" /></svg>
          </div>
          <span className="pointer-events-none">Apply</span>
        </div>
      </button>
    </div>;
  }

  function addSearchFilter(type: string, value: string) {
    var currentUrl = window.location.href;
    var newUrl = '';
    if (value === 'NotSelected') {
      //remove filter from url
      newUrl = currentUrl.replace(new RegExp('&?' + type + '=[^&]*', 'g'), '');
    }
    else if (currentUrl.includes(type)) 
    {
      newUrl = currentUrl.replace(new RegExp(type + '=[^&]*', 'g'), type + '=' + value);
    }
    else
    {
      var delimeter = "&";
      newUrl = currentUrl + delimeter + type + "=" + value;
    }
    window.location.href = newUrl;
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

  //eslint-disable-next-line
  function getSearchText(event: React.FormEvent<HTMLFormElement>, selectedValue: string) {
    var currentUrl = window.location.href;
    var newUrl = '';
    event.preventDefault();
    const search = document.getElementById('search') as HTMLInputElement;
    newUrl = currentUrl.replace(new RegExp('search/[^&]*', 'g'), 'search/' + search.value);
    console.log(newUrl);
    window.location.href = newUrl;
  }
}

export default SearchPage;
