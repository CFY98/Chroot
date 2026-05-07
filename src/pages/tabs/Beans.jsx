import "../css/pages.css";
import Title from "./Title";
import Subtitle from "./Subtitle";
import ProductCard from "./ProductCard";

function Beans() {
  return (
    <>
      <Title title="Coffee Beans" />
      <div id="product-wrapper">
        <Subtitle subtitle="Please browse our selection of coffee beans" />
        <ProductCard
          src="/Images/blaze.jpg"
          alt="Picture of coffee beans called Blaze."
          arialabel="More information on Blaze."
          itemName="Blaze (200g)"
          itemPrice="£11.99"
        />
      </div>
    </>
  );
}

export default Beans;
