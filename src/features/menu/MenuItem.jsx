import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex items-center gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 w-24 ${soldOut ? "opacity-60 grayscale" : ""}`}
      />
      <div className="flex grow flex-col py-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-600">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase text-stone-500">Sold out</p>
          )}

          <Button type="small">add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
