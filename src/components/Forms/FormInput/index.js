import "./styles.scss";

const FormInput = ({ handleChange, label, ...props }) => {
  return (
    <div className="formRow">
      {label && <label>{label}</label>}
      <input onChange={handleChange} className="formInput" {...props} />
    </div>
  );
};

export default FormInput;
