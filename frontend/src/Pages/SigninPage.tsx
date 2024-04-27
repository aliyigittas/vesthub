import Cookies from 'js-cookie';
import vesthublogo from '../vesthublogo.png';
import axios from 'axios';

function SigninPage() {
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
            <form className="space-y-6" action="#" method="POST" onSubmit={handleLoginDummy}>
                <div>
                    <label className="block text-sm font-medium leading-6">Email address</label>
                    <input id="email" name="email" type="email" autoComplete="email" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary"/>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <label className="block font-medium leading-6">Password</label>
                    <span className="font-semibold text-button-primary hover:text-button-primaryHover cursor-pointer" onClick={() => alert("Do not forget your password!")}>Forgot password?</span>
                </div>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 focus:outline-button-primary"/>
                <input type="submit" className="flex w-full justify-center rounded-md bg-button-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-primaryHover" value="Sign in"/>
            </form>
            <div className="mt-7 flex flex-row items-center justify-between">
                <label>Don't have an account?</label>
                <button className="font-semibold text-button-primary hover:text-button-primaryHover" onClick={() => window.location.href = '/register'}>Create an Account</button>
            </div>
        </div>
    </div>
  );
}
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
        Cookies.set("Name", "Ali", { expires: 1 }); //expires in 1 day
        Cookies.set("Surname", "Tas", { expires: 1 }); //expires in 1 day
        window.location.href = '/profile';
    })
    .catch(function (error) {
        console.log(error);
        window.location.href = '/';
    });
  }

  function handleLoginDummy(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    //const password = data.get('password') as string;

    Cookies.set("loggedIn", "true", { expires: 1 }); //expires in 1 day
    Cookies.set("Name", "Ali", { expires: 1 }); //expires in 1 day
    Cookies.set("Surname", "Tas", { expires: 1 }); //expires in 1 day
    Cookies.set("Email", email, { expires: 1 }); //expires in 1 day
    window.location.href = '/';
  }


export default SigninPage;