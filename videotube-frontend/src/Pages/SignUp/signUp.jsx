import React, { useState } from 'react'
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
    const [singUpFiled, setSignUpField] = useState({ "channelName": "", "userName": "", "password": "", "about": "", "profilePic": uploadedImageUrl });
    const [progressBar,setProgressBar] = useState(false);
    const navigate = useNavigate();
    const handleInputFiled = (event, name) => {
        setSignUpField({
            ...singUpFiled, [name]: event.target.value
        })
    }
    console.log(singUpFiled)

    const uploadImage = async (e) => {
        console.log("Uploading")
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // youtube-clone
        data.append('upload_preset', 'youtube-clone');
        try {
            // cloudName="divgaz72s"
            setProgressBar(true)
            const response = await axios.post("https://api.cloudinary.com/v1_1/divgaz72s/image/upload", data)
            setProgressBar(false)
            const imageUrl = response.data.url;
            setUploadedImageUrl(imageUrl);
            setSignUpField({
                ...singUpFiled, "profilePic": imageUrl
            })
        } catch (err) {
            console.log(err)
        }


    }

    const handleSignup = async () => {

        setProgressBar(true);
        axios.post('http://localhost:4000/auth/signUp', singUpFiled).then((res) => {
            toast.success(res.data.message);
            setProgressBar(false);
            navigate('/');
        }).catch(err => {
            setProgressBar(false);
            toast.error(err);
        })
    }



    return (
        <div className='signUp'>
            <div className="signup_card">
                <div className="signUp_title">
                    <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' />
                    SignUp
                </div>

                <div className="signUp_Inputs">
                    
                    <input type="text" className='signUp_Inputs_inp' value={singUpFiled.channelName} onChange={(e)=>handleInputFiled(e, "channelName")} placeholder='Channel Name' />
                    <input type="text" className='signUp_Inputs_inp' value={singUpFiled.userName}  onChange={(e)=>handleInputFiled(e, "userName")} placeholder='User Name' />
                    <input type="password" className='signUp_Inputs_inp' value={singUpFiled.password} onChange={(e)=>handleInputFiled(e, "password")} placeholder='Password' />
                    <input type="text" className='signUp_Inputs_inp' value={singUpFiled.about}  onChange={(e)=>handleInputFiled(e, "about")} placeholder='About your channel' />
                    

                    <div className="image_upload_signup">
                        <input type='file' onChange={(e) => uploadImage(e)} />
                        <div className='image_upload_signup_div'>
                            <img className='image_default_signUp' src={uploadedImageUrl} />
                        </div>
                    </div>


                    <div className="signUpBtns">
                        <div className="signUpBtn" onClick={handleSignup}>SignUp</div>
                        <Link to={'/'} className="signUpBtn">Home Page</Link>

                    </div>

                    {progressBar && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>}

                </div>

            </div>
            <ToastContainer />
        </div>
        
    )
}

export default SignUp