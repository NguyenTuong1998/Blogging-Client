'use client'
import AnimationWraper from "@/common/AnimationWraper";
import InputBox from "@/components/Utils/InputBox";
import Link from "next/link";
import Image from "next/image";
import { redirect } from 'next/navigation'
import googleIcon from '../../../../public/imgs/google.png'
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { storeInSession } from "@/common/session";
import { useContext,useState, useEffect, useRef } from "react";
import { UserContext } from "@/app/app-provider";

import { Button } from "@/components/ui/button"
import app from "@/lib/auth";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { authWithPopup } from "@/common/firebase";


let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
interface authProps {
  type: string;
}

const UserAuthForm: React.FC<authProps> = ({ type }) => {

  let { userAuth, setUserAuth } = useContext(UserContext) as any;
  let { user, setUser } = useState() as any;
  
  const userAuthThroughServer = (serverRouter: string, formData: any) => {
    axios.post(process.env.VITE_SERVER_DOMAIN + serverRouter, formData)
      .then(({ data }) => {
        storeInSession('user', JSON.stringify(data))
        setUserAuth(data)
      })
      .catch(({ response }) => toast.error(response.data.error))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formElement = document.getElementById("formElement") as HTMLFormElement
    let serverRouter = type === 'sign-in' ? 'signin' : 'signup';

    // form dataa
    let form = new FormData(formElement)
    let formData: Record<string, unknown> = {};

    for (let [key, value] of form.entries()) {
      formData[key as string] = value;
    }

    let { fullname, email, password } = formData as { fullname: string; email: string; password: string };

    //validate data 
    if (fullname) {
      if (fullname.length < 3) {
        return toast.error('fullname must be at least 3 letters long');
      }
    }

    if (!email.length) {
      return toast.error('Enter Email');
    }
    if (!emailRegex.test(email)) {
      return toast.error('Email invalid');
    }
    if (!passwordRegex.test(password)) {
      return toast.error('Password should be 6 to 28 characters long with a numeric, lowercase and 1 upercase letters ');
    }

    userAuthThroughServer(serverRouter, formData);
  }

  const handleSigninGoogle = async (e: any) => {
    e.preventDefault()
    
    authWithPopup().then(user => {
      let serverRouter = 'google-auth'

      if(user){
        let formData = {
          access_token: user['accessToken']
        }
  
        userAuthThroughServer(serverRouter, formData)
      }
      
      
    })
    .catch(err => {
      toast.error('Trouble login through google')
      return console.error(err);
      
    });
  }

  // useEffect(() => {
  //   const auth = getAuth(app);
  //   const unSubcrise = auth.onAuthStateChanged((user) => {
  //     if(user) setUser(user)
  //       else setUser(null);
  //   })

  //   return () => unSubcrise()
  // },[])

  return (
    userAuth?.access_token ? redirect('/') :
      <AnimationWraper keyValue={type}>
        <section className='h-cover flex items-center justify-center'>
          <Toaster />
          <form id="formElement" className='w-[80%] max-w-[400px]'>
            <h2 className="scroll-m-20 border-b pb-2 border-none text-3xl font-semibold tracking-tight first:mt-0 text-center">
              {type === 'sign-in' ? 'Welcome back' : 'Join us today'}
            </h2>
            {type !== 'sign-in' ?
              <InputBox
                name='fullname'
                type='text'
                placeholder='Full name'
                icon='fi-rr-user'
              />
              : ''}

            <InputBox
              name='email'
              type='email'
              placeholder='Email'
              icon='fi-rr-envelope'
            />
            <InputBox
              name='password'
              type='password'
              placeholder='Password'
              icon='fi-rr-key'
            />
            <Button className="block m-auto text-base" onClick={handleSubmit}>{type.replace('-', '') === 'signin' ? ' Sign In' : 'Sign Up'}</Button>

            {/* <button
            className='btn-dark center mt-14'
            type='submit'
            onClick={handleSubmit}
          >
            <p className='py-2'>{type.replace('-', '') === 'signin' ? ' Sign In' : 'Sign Up'}</p>
          </button> */}

            <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
              <hr className='w-1/2 border-black' />
              <p>or</p>
              <hr className='w-1/2 border-black' />
            </div>
            <Button className='flex items-center justify-center gap-4 w-[90%] center text-base' onClick={handleSigninGoogle}>
              <Image
                src={googleIcon}
                width={500}
                height={500}
                alt="google-icon"
                className="w-5 py-0"
              />
              Continue with google
            </Button>
            {
              type === '/sign-in' ?
                <p className='mt-6 text-dark-grey text-xl text-center'>
                  Don't have an account ?
                  <Link href='signup' className='underline text-black text-xl ml-1'>
                    Join us to day
                  </Link>
                </p>
                :
                <p className='mt-6 text-dark-grey text-lg text-center'>
                  Already a member ?
                  <Link href='signin' className='underline text-black text-lg ml-1'>
                    Sign in here
                  </Link>
                </p>
            }
          </form>
        </section>
      </AnimationWraper>
  )
}

export default UserAuthForm