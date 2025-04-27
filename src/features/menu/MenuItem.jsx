import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityByID } from "../cart/cartSlise";
import DeleteCartItem from "../cart/DeleteCartItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentPizzaQuantityInCart = useSelector(getCurrentQuantityByID(id));
  const isPizzaInCart = currentPizzaQuantityInCart > 0;

  function handleAddItemToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
    };

    dispatch(addItem(newItem));
  }

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

          {isPizzaInCart && (
            <div className="flex items-center gap-4">
              <UpdateItemQuantity
                pizzaId={id}
                currentItemQuantity={currentPizzaQuantityInCart}
              />
              <DeleteCartItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isPizzaInCart && (
            <Button type="small" onClick={handleAddItemToCart}>
              add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
