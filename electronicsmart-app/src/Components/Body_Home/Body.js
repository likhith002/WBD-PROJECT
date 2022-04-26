import "./caro.css";
import CategoryOffer from "./CategoryOffer";

function Body() {
  return (
    <div>
      <CategoryOffer
        endpoints={["Offers", "TVs", "Laptops", "Mobiles"]}
        title="Shop by Category"
        initial="mobiles"
      />
      <br />
      <br />
      <CategoryOffer
        endpoints={["Offers", "TVs", "Laptops", "Mobiles"]}
        title="Shop by Category"
        initial="mobiles"
      />
    </div>
  );
}
export default Body;
