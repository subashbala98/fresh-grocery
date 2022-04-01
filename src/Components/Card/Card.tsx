import { Button } from "primereact/button";
import "./Card.css";
interface CardProps {
  imgAlt: string;
  imgUrl: string;
  name: string;
  price: number;
}
const card = (props: CardProps) => (
  <div className="card_container mt-5">
    <img alt={props.imgAlt} src={props.imgUrl} />
    <div className="flex align-content-center justify-content-between mr-6 ml-4">
      <h3>{props.name}</h3>
      <p>&#8377;{props.price}</p>
    </div>
    <div className="mt-4 text-center">
      <Button
        label="Buy now"
        className="p-button-success p-button-rounded buyNowBtn"
      />
    </div>
  </div>
);
export default card;
