import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import {useAppContext} from '../Context/AppContex'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




function AOuth () {
  const navigate = useNavigate();
    const {signInSuccess}= useAppContext();
const handleGoogleSubmit = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
    console.log(result);

    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: result.user.displayName,
        email: result.user.email,
        // avatar: result.user.avatarURL,
        avatar: result.user.photoURL,
      }),
    });

    const data = await res.json(); // ✅ response akhri
    
    if(data.success === false || !res.ok){
      toast.error(data.message || 'Google sign in failed');
      return;
    }
    
    signInSuccess(data);
    toast.success("Google sign in successful!",{
      onClose:()=>navigate('/')
    })

  } catch (error) {
    console.log('Google Sign-in Error:', error);
    toast.error('Google sign in failed. Please try again.');
  }
};



    return (
        <div className='p-3 rounded-lg bg-red-700 text-white text-center'>
            <button onClick={handleGoogleSubmit} type='button'>
                CONTINUE WITH GOOGLE
            </button>
        </div>
    );
}

export default AOuth;


