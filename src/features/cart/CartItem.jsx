import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-4 sm:flex sm:items-center">
      <p className="mb-1 font-medium sm:mb-0 sm:grow">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between space-x-6">
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
        <Button type="small">delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
