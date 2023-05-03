import { useEffect, useState } from "react";

function InputBox(props) {
  const [textBoxValue, setTextBoxValue] = useState("");

  // For edit, to bind value
  useEffect(() => {
    setTextBoxValue(props.value);
  }, [props.value]);

  function onInputChange(event) {
    let targetValue = event.target.value;
    
    setTextBoxValue(targetValue);
    props.onChange(event);
  }

  function onInputBlurChange(event) {
    let targetValue = event.target.value;
    
    setTextBoxValue(targetValue);
    props.onBlur(event);
  }

  return (
    <>
      <b>{props.label}</b>
      <input
        className="form-control"
        type={props.type}
        name={props.name}
        value={textBoxValue}
        placeholder={props.placeholder}
        onChange={(event) => onInputChange(event)}
        onBlur={(event) => onInputBlurChange(event)}
      />
    </>
  );
}

export default InputBox;
