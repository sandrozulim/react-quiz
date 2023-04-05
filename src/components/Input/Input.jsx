import classes from "./Input.module.scss";

function Input(props) {
  const { label, id, className, value, onChange, ...rest } = props;

  const inputClasses = className
    ? `${classes["container"]} ${className}`
    : classes["container"];

  return (
    <div className={inputClasses}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        className={classes["input"]}
        id={id}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

export default Input;
