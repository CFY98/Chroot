function ProductCard({ src, alt, arialabel, href, itemName, itemPrice }) {
  return (
    <div className="caption-container">
      <img src={src} alt={alt} className="fadein" />
      <div className="caption">
        <a className="more" aria-label={arialabel} href={href} data-link>
          {true} More info
        </a>
      </div>
      <div className="information fadein">
        <p className="itemnames">{itemName}</p>
        <p className="prices">{itemPrice}</p>
      </div>
    </div>
  );
}

export default ProductCard;
