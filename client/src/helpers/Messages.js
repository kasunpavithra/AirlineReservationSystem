import { toast } from "react-toastify";

const ErrorMessage = ({
    error,
    main_part = 'REQUEST FAILED',
    default_message = 'UNKNOWN ERROR OCCOURED',
    custom_message = ''
}) => {

    // console.log("error response message : ", error?.response?.data?.message);
    // console.log("error response :", error?.response);

    let message = error?.response?.data?.message[0].message;
    message = message ? main_part + " " + message : main_part + " " + default_message;

    message = custom_message ? custom_message : message;

    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const SuccessMessage = (message = 'REQUEST SUCCESSFUL',) => {

    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default {
    ErrorMessage,
    SuccessMessage
};