import React, { useRef, useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";
const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = validate(email.current.value, password.current.value);
    seterrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://ddivineart.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-07-22-at-4.14.58-AM.jpeg",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              seterrorMessage(error.message);
            });

          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorMessage + "-" + errorCode);
          // ..
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSingInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          className="w-screen h-screen object-cover"
          src={BG_URL}
          alt="Netflix Logo"
        />
      </div>
      <form
        onClick={(e) => e.preventDefault()}
        className="p-12 bg-opacity-80 bg-black absolute w-3/12 my-36  mx-auto right-0 left-0 text-white "
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="FullName"
            className="p-4 my-2 w-full rounded-sm bg-gray-700 text-white"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="EmailAddress"
          className="p-4 my-2 w-full rounded-sm bg-gray-700 text-white"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full rounded-sm bg-gray-700 text-white"
        />
        <p className="text-red-600">{errorMessage}</p>
        <button
          onClick={() => handleButtonClick()}
          className="p-2 my-2 rounded-sm  bg-red-800 w-full "
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={() => toggleSingInForm()} className="cursor-pointer">
          {isSignInForm
            ? "New To Netflix ? Sign Up Now"
            : "Already Have An Account ? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
