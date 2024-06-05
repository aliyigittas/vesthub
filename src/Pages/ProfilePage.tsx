import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import CSS for AOS
import Cookies from 'js-cookie';
import axios from 'axios';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

function ProfilePage() {
  


  
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []); // Ensure this effect runs only once after initial render

  return (
    <div className="flex flex-wrap-reverse min-h-full pb-10 gap-20 justify-center bg-inherit">
      <div data-aos="fade-right" data-aos-duration="1200" className="flex flex-col">
        <div  className="flex flex-col items-center justify-center space-y-2"> {/* Add flex and flex-col classes */}
          <h1>Profile Page</h1>
          <div className="flex flex-col items-center space-y-2"> {/* Wrap image and text in a flex container */}
            <img src='https://pbs.twimg.com/profile_images/1379094653774008320/jwzwQYBS_400x400.jpg' alt='Customer' className="w-48 h-48 rounded-full shadow-xl mb-2" />
            <label> {Cookies.get("Name")} {Cookies.get("Surname")} </label>
          </div>
        </div>
        <div className="mt-8 w-full max-w-[600px] p-4">
          <Tab.Group >
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
                <EditProfileInfo/>
              </Tab.Panel>
              <Tab.Panel>
                <EditChangePassword/>
              </Tab.Panel>
              <Tab.Panel>
                <EditUserAddress/>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );

  function EditProfileInfo()
  {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    return (
      <form className="flex flex-col space-y-2" onSubmit={handleSaveProfileInfo}>
        <div className="flex flex-row space-x-2">
          <input type="text" name="name" placeholder="Name" defaultValue={Cookies.get ("Name")} onChange={(e) => setName(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
          <input type="text" name="surname" placeholder="Surname" defaultValue={Cookies.get ("Surname")} onChange={(e) => setSurname(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
        </div>
        <div className="flex flex-row space-x-2">
          <input type="email" name="email" placeholder="Email" defaultValue={Cookies.get ("Email")} onChange={(e) => setEmail(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
          <input type="tel" name="phone" placeholder="Phone" defaultValue={Cookies.get ("Phone")} onChange={(e) => setPhone(e.target.value)} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
        </div>
        <div className=' flex justify-center pt-4'>
          <button className="flex w-full justify-center rounded-md bg-button-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-primaryHover" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }

  function EditChangePassword()
  {
    const [currentPasswordShow, setCurrentPasswordShow] = useState(false);
    const [newPasswordShow, setNewPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    return (
      <form className="flex flex-col" onSubmit={handleChangePassword}>
        <div className="relative flex flex-row">
          <input type="password" id="currentPassword" name="currentPassword" placeholder="Current Password" onChange={(e) => {}} autoComplete="current-password" className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
          <div className="absolute right-2 top-2 items-center">
            <button type="button" className="absolute right-1 top-1 items-center" onClick={() => {
              //change the type of the input field to show the password
              setCurrentPasswordShow(!currentPasswordShow);
              var x = document.getElementById("currentPassword");
              if (x!.getAttribute("type") === "password") {
                x!.setAttribute("type", "text");
              } else {
                x!.setAttribute("type", "password");
                
              }}} >
              {currentPasswordShow ? <EyeInvisibleOutlined /> : <EyeOutlined /> }
            </button>
          </div>
        </div>
        <div className="relative flex flex-row">
          <input type="password" id="newPassword" name="newPassword" placeholder="New Password" autoComplete="new-password" className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
          <div className="absolute right-2 top-2 items-center">
            <button type="button" className="absolute right-1 top-1 items-center" onClick={() => {
            //change the type of the input field to show the password
            setNewPasswordShow(!newPasswordShow);
            var x = document.getElementById("newPassword");
            if (x!.getAttribute("type") === "password") {
              x!.setAttribute("type", "text");
            } else {
              x!.setAttribute("type", "password");
            }}} >
            {newPasswordShow ? <EyeInvisibleOutlined /> : <EyeOutlined /> }
            </button>
          </div>
        </div>
        <div className="relative flex flex-row">
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
          <div className="absolute right-2 top-2 items-center">
            <button type="button" className="absolute right-1 top-1 items-center" onClick={() => {
            //change the type of the input field to show the password
            setConfirmPasswordShow(!confirmPasswordShow);
            var x = document.getElementById("confirmPassword");
            if (x!.getAttribute("type") === "password") {
              x!.setAttribute("type", "text");
            } else {
              x!.setAttribute("type", "password");
            }}} >
            {confirmPasswordShow ? <EyeInvisibleOutlined /> : <EyeOutlined /> }
            </button>
          </div>
        </div>
        <div className=' flex justify-center pt-4'>
          <button className="flex w-full justify-center rounded-md bg-button-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-primaryHover" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }

  function EditUserAddress()
  {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    return (
      <form className="flex flex-col" onSubmit={handleSaveAddressSettings}>
        <input type="text" placeholder="Address" defaultValue={Cookies.get ("fullAddress")} onChange={(e) => {setAddress(e.target.value)}} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
        <input type="text" placeholder="City"  defaultValue={Cookies.get ("City")} onChange={(e) => {setCity(e.target.value)}} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
        <input type="text" placeholder="Country" defaultValue={Cookies.get ("Country")} onChange={(e) => {setCountry(e.target.value)}} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary" />
        <div className=' flex justify-center pt-4'>
          <button className="flex w-full justify-center rounded-md bg-button-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-primaryHover" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
  
  function handleSaveProfileInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name') as string;
    const surname = data.get('surname') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    console.log(name, surname, email, phone);
    if (name == '' || surname == '' || email == '' || phone == '') {
      alert("Please fill all the fields!");
      return;
    } 
    axios.post('http://localhost:8080/api/updateProfileInfo', {
      name: name,
      surname: surname,
      oldEmail: Cookies.get("Email"),
      newEmail: email,
      phone: phone,
    }).then((response) => {
      console.log(response);
      if (response.data==true) {
        Cookies.set("Name", name);
        Cookies.set("Surname", surname);
        Cookies.set("Email", email);
        Cookies.set("Phone", phone);
        alert("Profile updated successfully!");
        window.location.href = '/profile';
      }
      if (response.data==false) {
        alert("This email is already in use!");
      }
    }).catch((error) => {
      console.log(error);
      alert("An error occurred while updating the profile!");
    });
  }

  function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const currentPassword = data.get('currentPassword') as string;
    console.log("password is :",currentPassword);
    const newPassword = data.get('newPassword') as string;
    const confirmPassword = data.get('confirmPassword') as string;
    console.log(currentPassword, newPassword, confirmPassword);
    if (currentPassword == '' || newPassword == '' || confirmPassword == '') {
      alert("Please fill all the fields!");
      return;
    }
    if (newPassword != confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
        alert("Password must be at least 8 characters long and cannot be more than 16 characters, also it must contain at least one number, one uppercase letter and one lowercase letter");
        return;
    }

    axios.post('http://localhost:8080/api/changePassword', {
      email: Cookies.get("Email"),
      currentPassword: currentPassword,
      newPassword: newPassword,
    }).then((response) => {
      console.log(response);
      if (response.data==true) {
        alert("Password changed successfully!");
        window.location.href = '/profile';
      }
      if (response.data==false) {
        alert("Current password is wrong!");
      }
    }).catch((error) => {
      console.log(error);
      alert("An error occurred while changing the password!");
    });

  }

  function handleSaveAddressSettings(event: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const address = data.get('address') as string;
    const city = data.get('city') as string;
    const country = data.get('country') as string;
    console.log(address, city, country);
    if (address == '' || city == '' || country == '') {
      alert("Please fill all the fields!");
      return;
    }
    axios.post('http://localhost:8080/api/updateAddressSettings', {
      email: Cookies.get("Email"),
      address: address,
      city: city,
      country: country,
    }).then((response) => {
      console.log(response);
      if (response.data==true) {
        Cookies.set("fullAddress", address);
        Cookies.set("City", city);
        Cookies.set("Country", country);
        alert("Address settings updated successfully!");
        window.location.href = '/profile';
      }
    }).catch((error) => {
      console.log(error);
      alert("An error occurred while updating the address settings!");
    });
  }
}

export default ProfilePage;
