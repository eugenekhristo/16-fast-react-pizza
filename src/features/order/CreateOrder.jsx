import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getCartTotalPrice } from "../cart/cartSlise";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errors = useActionData();
  const {
    username,
    status: loadingAddressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const totalPrice = useSelector(getCartTotalPrice);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const totalPriceWithPriority = totalPrice + priorityPrice;

  const isLoadingAddress = loadingAddressStatus === "loading";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-9">
      <h2 className="mb-7 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="inputs mb-6 flex flex-col gap-4 md:mb-7 md:gap-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="inline-block md:basis-32">First Name</label>
            <input
              type="text"
              name="customer"
              required
              className="input flex-1"
              defaultValue={username}
            />
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="inline-block md:basis-32">Phone number</label>
            <div className="flex flex-1 flex-col gap-2">
              <input
                type="tel"
                name="phone"
                required
                className="input w-full"
              />

              {errors?.phone && (
                <p className="rounded-md bg-red-100 px-4 py-2 text-xs font-medium text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="inline-block md:basis-32">Address</label>
            <div className="relative flex flex-1 flex-col gap-2">
              <input
                type="text"
                name="address"
                required
                className="input w-full"
                disabled={isLoadingAddress}
                defaultValue={address}
              />
              {!position.latidude && !position.longitude && (
                <span className="absolute right-[3px] top-[3px] md:right-[8px] md:top-[7px]">
                  <Button
                    type="small"
                    onClick={() => dispatch(fetchAddress())}
                    disabled={isLoadingAddress}
                  >
                    Get my address
                  </Button>
                </span>
              )}
              {loadingAddressStatus === "error" && (
                <p className="rounded-md bg-red-100 px-4 py-2 text-xs font-medium text-red-500">
                  {errorAddress}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-7 flex items-center gap-4 md:mb-9">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => {
              e.preventDefault();
              setWithPriority(e.target.checked);
            }}
          />
          <label
            htmlFor="priority"
            className="cursor-pointer text-sm font-medium"
          >
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.longitude}, ${position.latitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPriceWithPriority)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
