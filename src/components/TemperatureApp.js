import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
// import "./App.css";
const TemperatureApp = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [img_url, setimg_url] = useState("");
  const [unsplash_img, setunsplash_img] = useState("london");
  const api_key = "6fe99ad299eb502b7d09bff870f3e3c2";
  // const unsplash_url = `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=f2w_yd1E2aJNhK40B3gWmeH8PXPWVqmtnxsV15BJfHE`;

  const getWetherDetails = (city) => {
    if (!city) return <p>No data found</p>;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      api_key;
    axios
      .get(apiURL)
      .then((res) => {
        setData(res.data);
        setimg_url(res.data.weather[0].icon);
      })
      .catch((err) => {
        console.log("err", err);
        alert("Error, please check console for more info...");
      });
  };
  // fetch(unsplash_url)
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => console.log(error));

  const fetchAPI_unsplash = async (city) => {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=f2w_yd1E2aJNhK40B3gWmeH8PXPWVqmtnxsV15BJfHE`
    );
    console.log(res.data.results[0].urls.full);
    const data = await res.data.results[0].urls.full;
    setunsplash_img(data);
  };
  // document.getElementById(
  //   "container"
  // ).style.backgroundImage = `url("${unsplash_img}")`;
  // let image = {
  //   client_ID_unsplash: "f2w_yd1E2aJNhK40B3gWmeH8PXPWVqmtnxsV15BJfHE",
  //   fetch_image: function (city) {
  //     fetch(
  //       "https://api.unsplash.com/search/photos?query=" +
  //         city +
  //         "&client_id=" +
  //         this.client_ID_unsplash
  //     )
  //       .then((response) => response.json())
  //       .then((event) => {
  //         this.display_image(event);
  //       });
  //   },
  //   display_image: function (event) {
  //     const { raw } = event.results[0].urls;
  //     document.getElementsByClassName(
  //       "container"
  //     )[0].style.backgroundImage = `url("${raw}")`;
  //   },
  //   search: function () {
  //     this.fetch_image(document.getElementById("search_box").value);
  //   },
  // };
  const handleInputChange = (e) => {
    // console.log("value", e.target.value);
    setCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(city);
    fetchAPI_unsplash(city);
  };
  useEffect(() => {
    getWetherDetails("london");
  }, []);
  // useEffect(() => {
  //   const keyDownHandler = (e) => {
  //     if (e.code === "Enter" || e.code === "NumpadEnter") {
  //       console.log("hey");
  //       e.preventDefault();
  //     }
  //     handleSearch();
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);
  // console.log(data.weather[0].icon);
  const image_url = `https://openweathermap.org/img/wn/${img_url}@2x.png`;
  return (
    <>
      <div
        className="container"
        style={{
          backgroundImage: `url(${unsplash_img})`,
          display: "flex",
          height: "100%",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="information">
          <input
            id="search_box"
            type="text"
            placeholder="Another Location"
            onChange={handleInputChange}
            value={city}
          />

          <button id="search" onClick={handleSearch}>
            {/* <i
              className="fa-light fa-magnifying-glass fa-fade fa-lg"
              style={{ color: "#ffffff" }}
            ></i> */}
            {/* <i class="fa-light fa-magnifying-glass"></i> */}
            <i className="fal fa-search"></i>
          </button>
          {/* {
            (document.getElementsByClassName(
              "container"
            )[0].style.backgroundImage = `url("${unsplash_img}")`)
          } */}
          <div className="suggested group_header">
            <span className="header">Most popular searches</span>
            {"\n"}
            {"\n"}
            <ul className="popular_searches">
              <li className="mouse one1">New York</li>
              <li className="mouse two2">London</li>
              <li className="mouse three3">Delhi</li>
              <li className="mouse four4">Tokyo</li>
            </ul>
          </div>
          <hr />
          <div className="group_header Details">
            <span className="header">Weather Details</span>
            {"\n"} {"\n"}
            <ul className="detail">
              <li>
                Cloudy&nbsp;&nbsp;&nbsp; <span className="values one">Yes</span>{" "}
              </li>
              <li>
                Humidity<span className="values two">Yes</span>
              </li>
              <li>
                Wind &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="values three">Yes</span>
              </li>
            </ul>
          </div>
          <hr />
        </div>

        <div className="graphics loading">
          <div className="temperature">{data?.main?.temp + "°C"}</div>
          <div className="weather_location_time">
            {" "}
            <span id="place">{data?.name}</span>
            <br />
            <span id="time">00:28-Sunday</span>
            <span id="date">20 May 2023</span>
          </div>
          <div>
            {/* {console.log(data.weather[0].icon)} */}
            <img id="icon" src={image_url} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TemperatureApp;
