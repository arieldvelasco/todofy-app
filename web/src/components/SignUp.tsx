import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, ToastContainer, toast } from 'react-toastify';
// import { setLocalStorage } from "../util/localStorage";
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase";
import { setLocalStorage } from "../util/localStorage";

interface signupProps {
    register: boolean;
    setRegister: (value: boolean) => void;
}

interface UserData {
    email: string;
    userId: string;
    userName: string;
}

const userCollectionRef = collection(db, 'users')

const addData = async (data: UserData) => {
    try {
        await addDoc(userCollectionRef, data)
        //getDataList()
    } catch (error) {
        console.error(error)
    }
}

const handleSignUp = async (email: string, password: string, userName: string) => {
    if (!email || !password || !userName) {
        toast.error("Please fill all fields");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Sign up successful!");
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        if (userCredential.user.email && userCredential.user.uid && userName) {
            addData({
                email: userCredential.user.email,
                userId: userCredential.user.uid,
                userName: userName
            });
        }
        setLocalStorage("user", {
            email: userCredential.user.email,
            uid: userCredential.user.uid
        });
        window.location.href = "/";
    } catch (error: unknown) {
        if (error && typeof error === "object" && "code" in error) {
            const err = error as { code?: string; message?: string };
            if (err.code === "auth/email-already-in-use") {
                toast.error("Email is already registered.");
            } else {
                toast.error("Error signing up.");
            }
            console.error("Error signing up:", err);
        } else {
            toast.error("Error signing up.");
            console.error("Error signing up:", error);
        }
    }
}

const SignUp: React.FC<signupProps> = ({ register, setRegister }) => {

    const [  email, setEmail ] = useState("");
    const [  password, setPassword ] = useState("");
    const [  userName, setUserName ] = useState("");

    return (
        <form className="flex flex-col w-96 mx-auto border-2 border-gray-900 rounded-xl py-10 px-5" >
            <header
                className="text-2xl font-bold text-center mb-5"
            >
                Sign Up
            </header>

            <section className="flex gap-2 mb-5" >
                <label
                    htmlFor="inputUserName"
                    className="flex-1/4"
                >
                    User name:
                </label>
                <input
                    type="text"
                    id="inputUserName"
                    placeholder="Enter your ser Name..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border pl-2 rounded-md flex-3/4"
                />
            </section>

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
                    handleSignUp(email, password, userName)
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-5 cursor-pointer"
            >
                Register
            </button>

            <span className="mx-auto" >
                Already have an account? Go to 
                <button
                    onClick={ () => setRegister(!register) }
                    className="text-blue-500 cursor-pointer ml-1"
                >
                    Login
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

export default SignUp