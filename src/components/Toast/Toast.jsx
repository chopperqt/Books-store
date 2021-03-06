import {
    Toast as ToastComponent,
    ToastHeader,
    ToastBody
} from 'reactstrap'

const Toast = ({view, viewButton}) => {
    console.log(view)
    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: "5"}}>
            <ToastComponent isOpen={view}>
            <div class="toast-header">
                <i className="bi bi-info-circle fs-6"></i>
                <strong class="me-auto ms-2">Info helper</strong>
                <button type="button" onClick={viewButton} class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Hello, world! This is a toast message.
            </div>
            </ToastComponent>
        </div>

    );
}
 
export default Toast;