import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-9 font-medium">
        Your cart is still empty. Start adding some pizzas{" "}
        <span className="text-[24px]">😊</span>
      </p>
    </div>
  );
}

export default EmptyCart;
