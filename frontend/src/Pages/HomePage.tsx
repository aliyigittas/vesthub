import { useEffect, useState } from 'react';
import House2 from '../House2.jpg';
import { ButtonGroup } from 'reactstrap';
import FeaturedHouses from '../Components/FeaturedHouses';
import HomeModal from '../Components/HomeModal';
import homes from '../Components/TempHomes';

//if href contains home id, open modal i.e. /home/EvID

//optional home props
function HomePage({ home }: { home?: boolean }) {
  const [show, setShow] = useState(false);
  //take the home id from the url the id is the last part of the url
  const currentUrlLastPart = window.location.pathname?.split('/')?.pop(); //url'yi /'ye göre ayır ve sonuncuyu al
  const homeID = parseInt(currentUrlLastPart ?? ''); //sondaki id'yi al ve integer'a çevir

  //eger home id NaN ise ve url boş değilse veya home id homes arrayinin dışında ise veya home id negatif ise
  if ((isNaN(homeID) && currentUrlLastPart!=='') || (homeID>=homes.length) || (homeID<0)) {
    window.location.href = '/notFound';
  }

  useEffect(() => {
    setShow(true);
  }, [homeID]);
  
  return (
    <div>
      <main className="min-h-full place-items-center bg-backColor px-6 py-6 lg:px-8">
        <div className="text-center">
          <div className="relative h-[25rem]">
            <img
              src={House2}
              alt="House"
              className="absolute z-0 rounded-lg shadow-md object-cover w-full h-[25rem] filter brightness-50"
            />
            <div className="p-[20px] relative z-10">
              <h1 className="mt-4 text-3xl font-bold tracking-wide text-white sm:text-5xl">
                Welcome to VestHub
              </h1>
              <p className="text-white text-center font-bold">
                The best place to find your dream home
              </p>
              <SearchHouses />
            </div>
          </div>
          <FeaturedHouses />
          {home && <HomeModal show={show} setShow={() => {
            window.location.href = '/';
            setShow(false);
          }} home={homes[homeID]} />}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover"
              onClick={() => (window.location.href = "/login")}
            >
              Go to Sign in page
            </button>
            <button
              className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover"
              onClick={() => (window.location.href = "/notFound")}
            >
              Go to Not Found page{" "}
            </button>
            <button
              className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover"
              onClick={() => (window.location.href = "/addHouse")}
            >
              Go to Add House page
            </button>
            <button
              className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover"
              onClick={() => {
                window.location.href = "/search";
                console.log("Open Modal");
              }}
            >
              Open Modal
            </button>
          </div>
        </div>
      </main>
    </div>
  );

  

  function SearchHouses() {
    const [selectedValue, setSelectedValue] = useState("sale");
    return (
      <div>
        <ButtonGroup className="p-[3.5px] mt-3 bg-gray-600 bg-opacity-60">
          <button className={`${selectedValue == "sale" ? "bg-button-secondary" : "bg-opacity-40"} ${selectedValue == "sale" ? "" : "hover:bg-gray-600"} text-white py-1.5 px-3 rounded transition duration-300 transform`} onClick={() => setSelectedValue("sale")}>Sale</button> {/*eslint-disable-line eqeqeq*/}
          <button className={`${selectedValue == "rent" ? "bg-button-secondary" : "bg-opacity-10"} ${selectedValue == "rent" ? "" : "hover:bg-gray-600"} text-white py-1.5 px-3 rounded transition duration-300 transform`} onClick={() => setSelectedValue("rent")}>Rent</button> {/*eslint-disable-line eqeqeq*/}
        </ButtonGroup>
        <div className="z-10 mt-5 md:px-32">
          <form className="relative" action="#" method="POST" onSubmit={(e) => getSearchText(e, selectedValue)}>
              <input type="search" id="search" className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder="Search Houses or Enter Location" required />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 top-2.5 bg-button-primary hover:bg-button-primaryHover focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/></svg>
                </div>
              </button>
          </form>
        </div>
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

export default HomePage;