import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";
import { auth, signInWithPopup, GoogleAuthProvider } from "../firebase";
import { Button } from "@mui/material";

const GoogleButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();
  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("result", user);
        dispatch(
          login({
            email: user.email,
            name: user.displayName,
          })
        );

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Button variant="contained" onClick={handleGoogleSignin}>
        Login with Google
      </Button>
    </>
  );
};

export default GoogleButton;
