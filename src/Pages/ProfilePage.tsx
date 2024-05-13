import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import CSS for AOS
import Cookies from 'js-cookie';

function ProfilePage() {
  


  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []); // Ensure this effect runs only once after initial render

  return (
    <div className="flex flex-wrap-reverse min-h-full pb-10 gap-20 justify-center bg-inherit">
      <div data-aos="fade-right" data-aos-duration="1200" className="flex flex-col">
        <div  className="flex flex-col items-center justify-center space-y-2"> {/* Add flex and flex-col classes */}
          <h1>Profile Page</h1>
          <div className="flex flex-col items-center space-y-2"> {/* Wrap image and text in a flex container */}
            <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-48 h-48 rounded-full shadow-xl mb-2" />
            <label> {Cookies.get("Name")} {Cookies.get("Surname")} </label>
          </div>
        </div>
        <div className="mt-8 w-full max-w-[600px] p-4">
          <Tab.Group>
            <Tab.List className="flex justify-between p-1 space-x-1 bg-gray-300 rounded-2xl">
              <Tab className={({ selected }) =>
                `${selected ? 'bg-button-primary text-white' : 'text-gray-600'} px-4 py-2 rounded-xl focus:outline-none`
              }>
                Profile Info
              </Tab>
              <Tab className={({ selected }) =>
                `${selected ? 'bg-button-primary text-white' : 'text-gray-600'} px-4 py-2 rounded-xl focus:outline-none`
              }>
                Change Password
              </Tab>
              <Tab className={({ selected }) =>
                `${selected ? 'bg-button-primary text-white' : 'text-gray-600'} px-4 py-2 rounded-xl focus:outline-none`
              }>
                Adress Settings
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <form className="flex flex-col space-y-2">
                  <div className="flex flex-row space-x-2">
                    <input type="text" placeholder="Name" defaultValue={Cookies.get ("Name")} onChange={(e) => setName(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                    <input type="text" placeholder="Surname" defaultValue={Cookies.get ("Surname")} onChange={(e) => setSurname(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                  </div>
                  <div className="flex flex-row space-x-2">
                    <input type="email" placeholder="Email" defaultValue={Cookies.get ("Email")} onChange={(e) => setEmail(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                    <input type="tel" placeholder="Phone" defaultValue={Cookies.get ("Phone")} onChange={(e) => setPhone(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                  </div>
                </form>
              </Tab.Panel>
              <Tab.Panel>
                <form className="flex flex-col">
                  <input type="password" placeholder="Current Password" defaultValue={Cookies.get ("Password")} onChange={(e) => setName(e.target.value)} autoComplete="current-password" className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                  <input type="password" placeholder="New Password" autoComplete="new-password" className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                  <input type="password" placeholder="Confirm Password" autoComplete="new-password" className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                </form>
              </Tab.Panel>
              <Tab.Panel>
                <form className="flex flex-col">
                  <input type="text" placeholder="Address" defaultValue={Cookies.get ("fullAddress")} onChange={(e) => setName(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                  <input type="text" placeholder="City"  defaultValue={Cookies.get ("City")} onChange={(e) => setName(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                  <input type="text" placeholder="Country" defaultValue={Cookies.get ("Country")} onChange={(e) => setName(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div className=' flex justify-center pt-4'>
            <button className="flex w-full justify-center rounded-md bg-button-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-primaryHover" type="button">
              Save
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default ProfilePage;
