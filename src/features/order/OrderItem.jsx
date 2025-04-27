import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-4">
      <div className="flex items-center justify-between text-sm">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="mt-2 text-sm capitalize italic text-stone-500">
        {isLoadingIngredients
          ? "Loading ingredients..."
          : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
