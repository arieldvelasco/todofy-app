import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { setLocalStorage } from "../util/localStorage";

interface LoginProps {
    register: boolean;
    setRegister: (value: boolean) => void;
}

const handleLogIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setLocalStorage("user", {
            email: userCredential.user.email,
            uid: userCredential.user.uid
        });
        toast.success("Login successful!");
        window.location.href = "/";
    } catch (error: unknown) {
        if (error && typeof error === "object" && "code" in error) {
            const err = error as { code?: string; message?: string };
            if (err.code === "auth/user-not-found") {
                toast.error("User not found. Please register.");
            } else if (err.code === "auth/wrong-password") {
                toast.error("Incorrect password. Please try again.");
            } else {
                toast.error("Error logging in.");
            }
            console.error("Error logging in:", err);
        } else {
            toast.error("Error logging in.");
            console.error("Error logging in:", error);
        }
    }
}

const Login: React.FC<LoginProps> = ({ register, setRegister }) => {

    const [  email, setEmail ] = useState("");
    const [  password, setPassword ] = useState("");

    return (
        <form className="flex flex-col w-96 mx-auto border-2 border-gray-900 rounded-xl py-10 px-5" >
            <header
                className="text-2xl font-bold text-center mb-5"
            >
                Log In
            </header>

            <section className="flex gap-2 mb-5" >
                <label
                    htmlFor="inputEmail"
                    className="flex-1/4"
                >
                    E-Mail:
                </label>
                <input
                    type="email"
                    id="inputEmail"
                    placeholder="youremai@domain.com..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border pl-2 rounded-md flex-3/4"
                />
            </section>

            <section className="flex gap-2 mb-5" >
                <label
                    htmlFor="inputPassword"
                    className="flex-1/4"
                >
                    Password:
                </label>
                <input
                    type="password"
                    id="inputPassword"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border pl-2 rounded-md flex-3/4"
                />
            </section>
            
            <button
                onClick={ (e) => {
                    console.log("Sign Up Clicked")
                    e.preventDefault();
                    handleLogIn(email, password)
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-5 cursor-pointer font-extrabold"
            >
                Log In
            </button>

            <span className="mx-auto" >
                Don't have an account? 
                <button
                    onClick={ () => setRegister(!register) }
                    className="text-blue-500 cursor-pointer ml-1"
                >
                    Register
                </button>
            </span>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </form>
    )
}

export default Login