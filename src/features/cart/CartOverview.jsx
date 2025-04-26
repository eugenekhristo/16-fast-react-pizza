import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getCartPizzasAmount, getCartTotalPrice } from "./cartSlise";

function CartOverview() {
  const cartPizzasAmount = useSelector(getCartPizzasAmount);
  const cartTotalPrice = useSelector(getCartTotalPrice);

  if (!cartPizzasAmount) return;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-3 font-semibold text-stone-300 sm:space-x-4">
        <span>{cartPizzasAmount} pizzas</span>
        <span>{formatCurrency(cartTotalPrice)}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
