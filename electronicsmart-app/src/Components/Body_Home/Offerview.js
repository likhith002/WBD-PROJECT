import { Link } from "react-router-dom";
function OfferView(props) {
  return (
    <div className="offer_view_123">
      {
        <Link to={props.path}>
          <span className="itemName">{props.itemName}</span>
          <span className="dicountText">
            {" "}
            {props.discount ? "(" + props.discount + "% off" + ")" : ""}
          </span>
          <br />
          <img src={props.img} alt="" /> <br />
          <div className="info">{props.info || ""}</div>
        </Link>
      }
    </div>
  );
}

export default OfferView;
