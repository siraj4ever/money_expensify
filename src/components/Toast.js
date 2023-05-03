import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast(props) {
  toast(props.textToast);

  return (
    <>
      <ToastContainer />
    </>
  );
}

export default Toast;
