import Cookies from 'js-cookie';
import vesthublogo from '../vesthublogo.png';
import axios from 'axios';
import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


function SigninPage() {
    const [passwordShow, setPassword] = useState(false);

    if (Cookies.get("loggedIn") === 'true') {
        window.location.href = '/';
    }
    
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-backColor">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto w-auto h-40 cursor-pointer" src={vesthublogo} alt="VestHub" onClick={() => window.location.href = '/'} />
            <h2 className="mt-10 text-center text-2xl font-bold">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
                <div>
                    <label className="block text-sm font-medium leading-6">Email address</label>
                    <input id="email" name="email" type="email" autoComplete="email" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary"/>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <label className="block font-medium leading-6">Password</label>
                    <span className="font-semibold text-button-primary hover:text-button-primaryHover cursor-pointer" onClick={() => alert("Do not forget your password!")}>Forgot password?</span>
                </div>
                {/*<input id="password" name="password" type="password" autoComplete="current-password" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary"/>*/}
                    <div className="relative flex flex-row mt-0">
                        <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary"/>                            <div className="absolute right-2 top-2 items-center">
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
                <input type="submit" className="flex w-full justify-center rounded-md bg-button-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-primaryHover" value="Sign in"/>
            </form>
            <div className="mt-7 flex flex-row items-center justify-between">
                <label>Don't have an account?</label>
                <button className="font-semibold text-button-primary hover:text-button-primaryHover" onClick={() => window.location.href = '/register'}>Create an Account</button>
            </div>
        </div>
    </div>
  );
  var profilePicture = "";
// eslint-disable-next-line
function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    axios.post('http://localhost:8080/api/login', {
        email: email,
        password: password
    })
    .then(function (response) {
        console.log(response);
        //if there is no such a user
        if(response.data === ""){
            alert("Please check your email and password!");
            return;
        }
        Cookies.set("Name", response.data.name, { expires: 1 }); //expires in 1 day
        Cookies.set("Surname", response.data.surname, { expires: 1 }); //expires in 1 day
        Cookies.set("Email", response.data.email, { expires: 1 }); //expires in 1 day
        Cookies.set("loggedIn", "true", { expires: 1 }); //expires in 1 day
        Cookies.set("Phone", response.data.phone, { expires: 1 }); //expires in 1 day
        Cookies.set("fullAddress", response.data.fullAddress, { expires: 1 }); //expires in 1 day
        Cookies.set("City", response.data.city, { expires: 1 }); //expires in 1 day
        Cookies.set("Country", response.data.country, { expires: 1 }); //expires in 1 day
        Cookies.set("Password", response.data.password, { expires: 1 }); //expires in 1 day
        console.log(response.data.profilePicture);
        profilePicture = response.data.profilePicture;

        // save the profile picture to local data
        localStorage.setItem("profilePicture", profilePicture);




        window.location.href = '/profile';
    })
    .catch(function (error) {
        console.log(error);
        window.location.href = '/';
    });
  }
}

export default SigninPage;