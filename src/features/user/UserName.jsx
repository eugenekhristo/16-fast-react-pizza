import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((store) => store.user.username);

  if (!username) return;

  return <p className="hidden text-sm font-semibold md:block">{username}</p>;
}

export default UserName;
