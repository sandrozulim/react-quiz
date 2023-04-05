import classes from "./Button.module.scss";

function Button({ className, children, onClick, ...rest }) {
  const btnClasses = className
    ? `${classes["btn"]} ${className}`
    : classes["btn"];

  return (
    <button className={btnClasses} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
