import { createPortal } from "react-dom";
const Modal = ({ children, open, close }) => {
  if (!open) return null;
  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black bg-opacity-10 "
        onClick={close}
      ></div>
      <div className=" fixed left-1/2 top-1/2  z-40   space-y-8 bg-white  font-display rounded-lg transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
