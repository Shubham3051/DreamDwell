import React from "react";
import "./Programs.css";
import program_1 from "../../assets/program-1.jpg";
import program_2 from "../../assets/program-2.webp";
import program_3 from "../../assets/program-3.jpg";
import program_icon_1 from "../../assets/program-icon-1.png";
import program_icon_2 from "../../assets/program-icon-2.png";
import program_icon_3 from "../../assets/program-icon-3.png";

const Programs = () => {
  return (
    <>
      <div className="Programs">
        <div className="Program">
          <img src={program_1} alt="Image" className="ig" />
          <div className="caption">
            <img src={program_icon_1} alt="Caption" />
            <p>Residential Property</p>
          </div>
        </div>
        <div className="Program">
          <img src={program_2} alt="Image" className="ig" />
          <div className="caption">
            <img src={program_icon_2} alt="Caption" />
            <p>Commercial Property</p>
          </div>
        </div>
        <div className="Program">
          <img src={program_3} alt="Image" className="ig" />
          <div className="caption">
            <img src={program_icon_3} alt="Caption" />
            <p>Industrial Property</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;
