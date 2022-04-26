import React from "react";
import { useState, useEffect } from "react";
import OfferView from "./Offerview";

function CategoryOffer(props) {
  // const endpoints= ['Offers','TVs','Laptops','Mobiles']
  const endpoints = props.endpoints;

  let [clicked, setclicked] = useState([]);
  // let [naviBtn,setnaviBtn] = useState()

  let [currentMenu, setCurrentMenu] = useState(props.initial);

  useEffect(() => {
    fetch(`http://localhost:3002/offer?type=${currentMenu.toLocaleLowerCase()}`)
      .then((res) => res.json())
      .then(setclicked);
  }, [currentMenu]);

  // const handleCategoryBtns = (increment)=>{
  //     let i = endpoints.indexOf(currentMenu);
  //     console.log(i);
  //     increment?setCurrentMenu((++i)%(endpoints.length+1)):setCurrentMenu((--i)%(endpoints.length+1));
  // }

  return (
    <div id="pranay-123">
      <h3>{props.title}</h3>
      <ul>
        {endpoints.map((elem, index) => {
          return (
            <li>
              <button
                key={index}
                className="offerBtn"
                onClick={() => {
                  setCurrentMenu(elem.toLocaleLowerCase());
                }}
              >
                {elem}
              </button>
            </li>
          );
        })}
      </ul>
      <br />

      {/* <button className='naviBtn' onClick={()=>{handleCategoryBtns(false)}}>Left</button> */}

      <div className="offer-grid">
        {" "}
        {clicked.map((element) => (
          <OfferView
            img={element.image}
            itemName={element.itemName}
            info={element.info}
            itemid={element.id}
            path={element.path}
          />
        ))}
      </div>

      {/* <button className='naviBtn'>Right</button> */}
    </div>
  );
}

export default CategoryOffer;
