import { formatCurrency } from "../../utils/helpers";
import DeleteCartItem from "./DeleteCartItem";

function CartItem({ item }) {
  const { pizzaID, name, quantity, unitPrice } = item;

  return (
    <li className="py-4 sm:flex sm:items-center">
      <p className="mb-1 font-medium sm:mb-0 sm:grow">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between space-x-6">
        <p className="font-semibold">{formatCurrency(quantity * unitPrice)}</p>
        <DeleteCartItem pizzaID={pizzaID} />
      </div>
    </li>
  );
}

export default CartItem;
