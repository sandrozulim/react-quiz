import classes from "./Select.module.scss";

function Select({ id, label, options = [], value, onChange }) {
  const optionContent = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className={classes["select-container"]}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={classes["select"]}
        id={id}
      >
        {optionContent}
      </select>
    </div>
  );
}

export default Select;
