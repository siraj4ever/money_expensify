function Button(props) {

  function submitDetails() {
    props.onClick();
  }
  return (
    <>
      <button className={props.className} onClick={() => submitDetails()}>
        {props.btnText}
      </button>
    </>
  );
}

export default Button;
