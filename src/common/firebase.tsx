import app from "@/lib/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getAuth } from "firebase/auth"

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const authWithPopup = async () => {

    let user = null;

    provider.setCustomParameters({
        prompt: 'select_account'
    })

    await signInWithPopup(auth, provider)
        .then((result) => user = result.user)
        .catch(err => console.error(err))
    return user;
}