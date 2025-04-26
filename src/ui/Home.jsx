import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((store) => store.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16 md:px-6">
      <h1 className="mb-4 text-xl font-semibold md:text-4xl">
        The best pizza.
        <br />
        <span className="text-[#ff9500]">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? (
        <Button type="primary" to="/menu">
          Continuer ordering, {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
