import vesthublogo from '../vesthublogo.png';
import axios from 'axios';

function RegisterPage()
{
    return (
        <div className="min-w-screen min-h-screen place-items-center flex sm:flex-row flex-col p-4 bg-backColor space-y-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto w-auto h-40 cursor-pointer" src={vesthublogo} alt="VestHub" onClick={() => window.location.href = '/'} />
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
                    <div>
                        <label className="block text-sm font-medium ">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                    </div>
                    <div className="flex flex-row space-x-2 justify-between">
                        <div>
                            <label className="block font-medium text-sm">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm  focus:outline-button-primary"/>
                        </div>
                        <div>
                            <label className="block font-medium text-sm">Confirm Password</label>
                            <input id="password" name="confirmPassword" type="password" autoComplete="current-password" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
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
}

function termsPopup()
{
    alert("Terms and conditions");
}

function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name') as string;
    const surname = data.get('surname') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;
    const checkbox = data.get('checkbox') as string;
    console.log(checkbox);
    if (checkbox!== "true")
    {
        alert("You must agree to the terms and conditions");
        return;
    }

    if (password !== confirmPassword)
    {
        alert("Passwords do not match");
        return;
    }

    axios.post('http://localhost:8080/api/register', {
        name: name,
        surname: surname,
        email: email,
        password: password
    })
    .then(function (response) {
        console.log(response);
        window.location.href = '/login';
    })
    .catch(function (error) {
        console.log(error);
        window.location.href = '/';
    });
}

export default RegisterPage;