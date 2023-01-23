import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import React from "react";

const FirebaseAuth = () => {
  // const [user, setUser] = React.useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setUser((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // };

  let provider = new GoogleAuthProvider();

  const handleSubmit = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(credential, token, user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage);
    }
  };

  return (
    <div>
      {/* <input
        onChange={(e) => handleChange(e)}
        type="text"
        name="email"
        placeholder="email"
      />
      <input
        onChange={(e) => handleChange(e)}
        type="password"
        name="password"
        placeholder="password"
      /> */}
      <button onClick={handleSubmit} type="button">
        Sign in with Google
      </button>
    </div>
  );
};

export default FirebaseAuth;
