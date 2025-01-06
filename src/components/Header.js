import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { NETFLIX_LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, [dispatch, navigate]);

  return (
    <div className=" absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <div className=" ">
        <Link to={"/"}>
          <img className="w-40" src={NETFLIX_LOGO} alt="Netflix Logo" />
        </Link>
      </div>
      {user && (
        <div className="w-20 h-20 p-4 flex justify-end">
          <button
            onClick={() => handleGptSearchClick()}
            className="rounded-lg text-center text-white font-bold mr-4"
          >
            GPTSearch
          </button>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/2586/2586717.png"}
            alt="user-icon"
            className="mr-4"
          />
          <button onClick={handleSignOut} className="font-bold text-white mr-4">
            SignOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
