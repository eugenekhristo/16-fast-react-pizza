import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { getCurrentQuantityByID } from "./cartSlise";
import DeleteCartItem from "./DeleteCartItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, unitPrice } = item;
  const currentItemQuantity = useSelector(getCurrentQuantityByID(pizzaId));

  return (
    <li className="py-4 sm:flex sm:items-center">
      <p className="mb-1 font-medium sm:mb-0 sm:grow">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between space-x-6">
        <p className="grow font-semibold">
          {formatCurrency(quantity * unitPrice)}
        </p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentItemQuantity={currentItemQuantity}
        />
        <DeleteCartItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
