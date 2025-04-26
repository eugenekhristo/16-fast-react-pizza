import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlise";

function DeleteCartItem({ pizzaID }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaID))}>
      delete
    </Button>
  );
}

export default DeleteCartItem;
