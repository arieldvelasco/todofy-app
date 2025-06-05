import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { db } from "../firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { toast } from "react-toastify"

interface User {
    email: string,
    uid: string,
    displayName: string
}

// collectionRef
const userCollectionRef = collection(db, 'users')

// Get data from the db

const getDataList = async (useId: string) => {
    try {
        const q = query(userCollectionRef, where("userId", "==", useId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            return userData.userName;
        } else {
            toast.error("Usuario no encontrado");
            return null;
        }
    } catch (error) {
        console.error(error)
    }
}

const Home = () => {

    const [ user, setUser ] = useState<User>();
    const [ userName, setUserName ] = useState<string>("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            return;
        }
        setUser(JSON.parse(storedUser));
        (async () => {
            const name = await getDataList(JSON.parse(storedUser).uid);
            if (name) {
                setUserName(name);
            }
        })();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(undefined);
        auth.signOut()
        toast.success("Logged out successfully!");
        // window.location.href = "/Auth";
    }

    return (
        <header>
            {
                user ? (
                    <nav>
                        <h1>Welcome, {userName}</h1>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={ handleLogout }
                        >
                            Log out
                        </button>
                    </nav>
                ) : (
                    <nav>
                        <h1>Welcome to the App</h1>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={ () => { window.location.href = "/auth"; } }
                        >
                            Log In
                        </button>
                    </nav>
                )
            }
            
        </header>
    )
}

export default Home