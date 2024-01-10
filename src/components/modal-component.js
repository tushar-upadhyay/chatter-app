import { useEffect, useRef } from "react";

const Modal = ({ isOpen, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current.showModal();
        }
        else {
            modalRef.current.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className="modal">
            {children}
        </dialog>
    );
}

export default Modal;