import React, { useRef, useState } from "react";
import './ImageGenerator.css';
import default_image from '../Assets/default_image.png';
import not_found_image from '../Assets/not-found.png';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const ImageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true);
        const response = await fetch("https:api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer APY_KEY",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    //  model: "",
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    //  size: "512 x 512"
                })

            }
        );
        let data = await response.json();
        console.log(data);
        let data_array = data.data;
        //  setImage_url(data_array[0].url);
        //     error
        let error = data.error.code;
        console.log(error);
        if (error == "billing_hard_limit_reached") {
            setLoading(false);
            setImage_url(not_found_image);
        }

    }

    return (
        <div>
            <div className="ai-image-generator">
                <div className="header">
                    AI Image <span>Generator</span>
                </div>
                <div className="img-loading" >
                    <div className="image">
                        <img src={image_url === "/" ? default_image : image_url} alt="" />
                    </div>
                </div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading.....</div>
                </div>
                <div className="search-box">
                    <input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want to see" />
                    <div className="generate-btn" onClick={() => { ImageGenerator() }}>Generate</div>
                </div>
            </div>
        </div>
    )
}

export default ImageGenerator;