import { useState } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";


const Auth = () => {

    const [ register, setRegister ] = useState(false);

    return (
        <div className="flex justify-center items-center flex-1 h-dvh" >
            {
                register ? (
                    <SignUp register={ register } setRegister={ setRegister } />
                ) : (
                    <Login register={ register } setRegister={ setRegister } />
                )
            }
        </div>
    )
}

export default Auth