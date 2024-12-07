import ReactDom from "react-dom";

export function Modal(props){

    const { children, handleCloseModal } = props

    return ReactDom.createPortal(

        <div className="modal-container">
            <button onClick={handleCloseModal} //The button is rendered as a full-screen overlay beneath the modal content , allows users to close the modal when they click outside the modal content area
            className="modal-underlay">
            </button>
            {/* The modal, including this button, is rendered in a special DOM node (e.g., <div id="portal">) to position it outside the normal component hierarchy, allowing full-page coverage. */}
            <div className="modal-content">
                {children}
            </div>
        </div>,document.getElementById("portal")
    )   
}