import Cookies from 'js-cookie';
import vesthublogo from '../vesthublogo.png';
import defaultProfilePhoto from '../DefaultProfilePhoto.png';
import axios from 'axios';
import { useState } from 'react';
import { profile } from 'console';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

function RegisterPage(){
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [passwordShow, setPassword] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);


    if (Cookies.get("loggedIn") === 'true') {
        window.location.href = '/';
    }
    
    return (
        <div className="min-w-screen min-h-screen place-items-center flex sm:flex-row flex-col p-4 bg-backColor space-y-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto w-auto h-40 cursor-pointer"
                    src={profileImage ? profileImage : defaultProfilePhoto}
                    alt="VestHub"
                    //open image picker when clicked
                    onClick={() => document.getElementById('fileInput')?.click()}
                />
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.item(0);
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                        setProfileImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                    }
                    }}
                />
                <h2 className="mt-10 text-center text-2xl font-bold">Register to your account</h2>
            </div>

            <div className="mx-auto w-full max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleRegister}>
                    <div className="flex flex-row space-x-2 justify-between">
                        <div>
                            <label className="block text-sm font-medium ">Name</label>
                            <input id="name" name="name" type="text" autoComplete="name" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Surname</label>
                            <input id="surname" name="surname" type="text" autoComplete="surname" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                    </div>
                    <div className='flex flex-row space-x-2 justify-between'>
                        <div>
                            <label className="block text-sm font-medium ">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Phone Number</label>
                            <input id="phone" name="phone" type="tel" autoComplete="phone" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2 justify-between">
                        <div>
                            <label className="block font-medium text-sm">Country</label>
                            <input id="Country" name="Country" type="text" autoComplete="Country" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                        <div>
                            <label className="block font-medium text-sm">City</label>
                            <input id="City" name="City" type="text" autoComplete="City" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2 justify-between">
                        <div>
                            <label className="block font-medium text-sm">Password</label>
                            <div className="relative flex flex-row">
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm  focus:outline-button-primary"/>
                                <div className="absolute right-2 top-2 items-center">
                                    <button type="button" className="absolute right-1 top-1 items-center" onClick={() => {
                                    //change the type of the input field to show the password
                                    setPassword(!passwordShow);
                                    var x = document.getElementById("password");
                                    if (x!.getAttribute("type") === "password") {
                                        x!.setAttribute("type", "text");
                                    } else {
                                        x!.setAttribute("type", "password");
                                        
                                    }}} >
                                    {passwordShow ? <EyeInvisibleOutlined /> : <EyeOutlined /> }
                                    </button>
                                </div>
                            </div>
                        </div>
                    <div>
                            <label className="block font-medium text-sm">Confirm Password</label>
                            <div className="relative flex flex-row">
                                <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
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
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input id="checkbox" type="checkbox" name="checkbox" value="true" className="w-4 h-4 text-button-primary rounded focus:ring-0 accent-button-primary" onChange={(e) => e.target.value = e.target.checked.toString()}/>
                        <label className="ms-2 text-sm font-medium">I agree with the <span className="text-button-primary hover:underline cursor-pointer" onClick={termsPopup}>terms and conditions</span>.</label>
                    </div>

                    <input type="submit" className="flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" value="Register"/>
                </form>
                <div className="mt-3 flex flex-row items-center justify-between">
                    <label>Already have an account?</label>
                    <button className="font-semibold text-button-primary hover:text-button-primaryHover" onClick={() => window.location.href = '/login'}>Sign in</button>
                </div>
            </div>
        </div>
    );

    function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name') as string;
        const surname = data.get('surname') as string;
        const email = data.get('email') as string;
        const phone = data.get('phone') as string;
        const country = data.get('Country') as string;
        const city = data.get('City') as string;
        const password = data.get('password') as string;
        const confirmPassword = data.get('confirmPassword') as string;
        const checkbox = data.get('checkbox') as string;
        console.log(checkbox);
        if (checkbox !== "true") {
            alert("You must agree to the terms and conditions");
            return;
        }
    
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        //username must be alphabetical and cannot be more than 45 characters
        //TODO: Add regex for alphabetical characters
        
        if (name.length > 45) {
            alert("Name must be alphabetical and cannot be more than 45 characters");
            return;
        }
    
        if (surname.length > 45) {
            alert("Surname must be alphabetical and cannot be more than 45 characters");
            return;
        }
    
        //password must be at least 8 characters long and cannot be more than 16 characters, also it must contain at least one number, one uppercase letter and one lowercase letter
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long and cannot be more than 16 characters, also it must contain at least one number, one uppercase letter and one lowercase letter");
            return;
        }        
    
        if(city.length > 45){ 
            alert("City cannot be more than 45 characters");
            return;
        }
    
        if(country.length > 45){
            alert("Country cannot be more than 45 characters");
            return;
        }
    
        // Phone number validation for Turkish numbers starting with 5 and followed by 9 digits
        const phoneRegex = /^5[0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid Turkish phone number starting with 5");
            return;
        }
    
        axios.post('http://localhost:8080/api/register', {
            name: name,
            surname: surname,
            email: email,
            password: password,
            phone: phone,
            country: country,
            city: city,
            fullAddress: "Easter egg",
            profilePicture: profileImage
        })
        .then(function (response) {
            //make a popup to inform the user that the registration is successful
            if (response.data === false) {
                alert("User already exists");
                return;
            }
            alert("Registration successful");
            window.location.href = '/login';
        })
        .catch(function (error) {
            console.log(error);
            window.location.href = '/';
        });
    }
}

function termsPopup()
{
    alert("Terms and conditions");
}




export default RegisterPage;