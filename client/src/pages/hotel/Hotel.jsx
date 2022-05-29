import { useContext, useState } from "react";
import "./Hotel.modules.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Header } from "../../components/Header/Header";
import { MailList } from "../../components/mailList/MailList";
import { Footer } from "../../components/footer/Footer";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${id}`);
  
  const {dates,options} = useContext(SearchContext);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (a, b) => {
    const timeDiff = Math.abs(b.getTime() - a.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days =dayDifference(dates[0].endDate, dates[0].startDate);
  
  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newSlideNumber;

    direction === "left"
      ? (newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1)
      : (newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1);
    setSlideNumber(newSlideNumber);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    }else{
    navigate("/login");
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading please wait"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                onClick={handleClose}
                icon={faCircleXmark}
                className="close"
              />
              <FontAwesomeIcon
                onClick={() => handleMove("left")}
                icon={faCircleArrowLeft}
                className="arrow"
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                onClick={() => handleMove("right")}
                icon={faCircleArrowRight}
                className="arrow"
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property ang get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div className="hotelImagesWrapper" key={index}>
                  <img
                    onClick={() => handleOpen(index)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                    key={index}
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  {data.description}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal &&
        <Reserve setOpen={setOpenModal} hotelId={id} /> }
    </div>
  );
};

export default Hotel;
