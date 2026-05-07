function SlideCards({ src, alt, caption }) {
  return (
    <figure>
      <img src={src} className="slide" alt={alt} />
      <div className="slidecaption">
        <p>{caption}</p>
      </div>
    </figure>
  );
}

export default SlideCards;
