import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  return <h1>Property ID: {id}</h1>;
};

export default PropertyDetails;