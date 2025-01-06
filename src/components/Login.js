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
              "https://lh3.googleusercontent.com/fife/ALs6j_E1JUOZrz84fArsPcFwlJiqvNL-Oh5Gcl82uBa7yrfnNx4XxEeAiod7JQDOnCLr199ipaGl7RI3ajctikMfe2qo1HtqTk03FQg93imufAOLX_RWMMtZCIjC-VHTmgZonr4tEsrRlzdPlkwtTpuezcg2z0Iy-a7ynLOHQaPA0rTP8b5fmXZVvD6fBO7j5QknwgPIhu8Kkn0g2kmqzsGCNoHq03UqR233dN49_Tsf92UysWAQCZOgCtS8ZuFCu0B4z21XpdVpqtKz2hhLSRkHDnsfRvnvGOf6s8SU1m19zipVjdnQC-Ys7Xc5aJHsN71UF86n9YAOqb3ELlHUNOGyOsrd0P-urLz4CwqQCSRV2d6HkU9MMq2GSfvFa9vEFLg9u3IZLmJO88_tpO-46DIQ6udA1kWAFJcabHcy0qr5Dtgwe_MDGm5FKKk5ANbhAbTJJwAgcVpUiuZwjAdL24iReMrfNYPR-JdkoxV51a6Fo0VERKr3PdTAtVavpk5uJnYbz8IAmMFIxpvsH_R3aRCwV0mLj4dr397Mf-ipkUK2tJsLPX60RG9C2LObgZutEakinMQwC7BXu-bIh45Vh8yA8xTnzCUlnEBdcMY6_KVSUdl9O90PeMHausrjnVBNHwnh-_xw1wgEHjIXpBqytLss1MkxFxUCeKPrn98CAzZhd5OlEskxu13cKDASNzYqybq9OGa_WSRftq20SPhc67jaorJwS9dFLnXyTe6V2EZcDC9vPmluEOFNR_vtiOT22vGig-Fe_L3C4qKSpr25p19JfjyzpVzqKO7Hq-0RkDQN0lb4_-YmMrmVkOJI9KtidW0053e0585c57Y4ds8zZoYbUs_w9dUxU_lC2fkPWJv1cHsmSkKeGAPtbDf1eip79j5VBWo5TwntdWKXi-fHVlxLwruFM6JxITTlNBafKbqa7om7He40t8IdmXHyGeQbLcedSv1T_1SHtoQQyB2n0v15wtqEAJS5MG-Zrt_W590Hm5uyrUG-M-XNi4n-luNXJy8YcnjP4MQ-R9J77BB7K0CwtQsva7JpozE_6cMBXAHOSXhsmms0Ik7S2k97CKDHnKsASQIgXKveyrjt-uVDeYY_4D43ZjKxssz0I7ywrPOJabLv0awmo8BC5Bhf27FMVwizjVpe2s2JTz8PAFHIQPDqGOJ0C3SZ888x28NCv3bwPeg1jb8hugqU60Y8pXlb2GyEpDDMi9jXMPqsK-ERssFUyMvWy-dydchg8SsN0TkFl0JS6X1wkGIPVjh04ReVIgL5Z3nZ8sBPSleNALH-pqQ2pjPoN6B_yN5SL_HVQMO10zuB2kEBXYzJXN8ZKAyR-87HD12tZxJqj0veK22OUjWOgjjhuGx6WtZHBY_ioLtKPABFZXmoylfMYj32iQb3FD6oP05Z3E3vwObfj7VW68JkybTPrPZ3UtcQOFJVIQ=s64-c",
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
