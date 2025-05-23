import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "text-sm inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed ";

  const styles = {
    primary: `${base} px-4 py-3 md:px-6 md:py-4`,
    small: `${base} px-4 py-2 text-xs`,
    round: `${base} w-8 h-8`,
    secondary:
      "text-sm inline-block rounded-full  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-200 border-2 border-stone-200 px-3.5 py-2.5 md:px-6 md:py-4 focus:ring-offset-2 disabled:cursor-not-allowed",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
