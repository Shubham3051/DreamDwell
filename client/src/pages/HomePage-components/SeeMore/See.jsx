import React from "react";

const See = () => {
  const images = [
    "../../assets/property1.jpg",
    "../../assets/property2.webp",
    "../../assets/property3.jpg",
    "../../assets/property1.jpg"
  ];

  return (
    <div>
      <h1>More Property Images</h1>

      <div className="image-container">
        {images.map((img, index) => (
          <img key={index} src={img} alt="property" />
        ))}
      </div>
    </div>
  );
};

export default See;