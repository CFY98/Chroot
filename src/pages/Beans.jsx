import "../css/pages.css";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ProductCard from "../components/ProductCard";

function Beans() {
  return (
    <>
      <Title title="Coffee Beans" />
      <div id="product-wrapper">
        <Subtitle subtitle="Please browse our selection of coffee beans" />
        <div className="products">
          <ProductCard
            src="/Images/blaze.jpg"
            alt="Picture of coffee beans called Blaze."
            arialabel="More information on Blaze."
            href="/blaze"
            itemName="Blaze (200g)"
            itemPrice="£11.99"
          />
          <ProductCard
            src="/Images/sunshine.jpg"
            alt="Picture of coffee beans called Sunshine."
            arialabel="More information on Sunshine."
            href="/sunshine"
            itemName="Sunshine (200g)"
            itemPrice="£14.99"
          />
          <ProductCard
            src="/Images/summit.jpg"
            alt="Picture of coffee beans called Summit."
            arialabel="More information on Summit."
            href="/summit"
            itemName="Summit (150g)"
            itemPrice="£19.99"
          />
        </div>
      </div>
    </>
  );
}

export default Beans;
