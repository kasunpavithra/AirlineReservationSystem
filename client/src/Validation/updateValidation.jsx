import Joi from 'joi';

const ValidateUpdate = (data) => {
    const UpdateValidationSchema = Joi.object({

        'First Name': Joi.string().required().regex(/^[a-z ,.'-]+$/i).messages({"string.empty": "Field should not be empty!" }),
        'Last Name': Joi.string().required().regex(/^[a-z ,.'-]+$/i).messages({"string.empty": "Field should not be empty!","string.required": "Field is required!"}),
       // 'NIC': Joi.string().alphanum().regex(/^([0-9]{9}[X|V]|[0-9]{12})$/).messages({ "string.pattern.base": "NIC number must end with V and must have at least 10 characters" }).min(10).max(20).required(),
        'Gender':Joi.required(),
        'Contact Number': Joi.string().regex( /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){9}\d$/).messages({ "string.pattern.base": "Contact number must start with 0 or +94 and must have 10 digits" }).length(10).required(),
        'Address': Joi.string().required(),
        'Birthday': Joi.date().max('01-01-2005').messages({ 'date.max': `Age must be 18+;"Birthday" must be before or equal to "01-01-2005` }).required()

    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

}

const ValidateAircraftTypeAdd = (data) => {
    const UpdateValidationSchema = Joi.object({

        'Name': Joi.string().required(),
        'Description': Joi.string().required()
    

    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

}

const ValidateAircraftAdd= (data) => {
    const UpdateValidationSchema = Joi.object({

        'EconomySeatCount': Joi.string().regex(/^[0-9]+$/i).required(),
        'BusinessSeatCount': Joi.string().required(),
        'PlatinumSeatCount': Joi.string().required(),
        'AircraftTypeID': Joi.string().required(),

    

    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

}






const ValidateGuest = (data) => {
    const UpdateValidationSchema = Joi.object({

        'First Name': Joi.string().required().regex(/^[a-z ,.'-]+$/i).messages({"string.empty": "Field should not be empty!" }),
        'Last Name': Joi.string().required().regex(/^[a-z ,.'-]+$/i).messages({"string.empty": "Field should not be empty!","string.required": "Field is required!"}),
       // 'NIC': Joi.string().alphanum().regex(/^([0-9]{9}[X|V]|[0-9]{12})$/).messages({ "string.pattern.base": "NIC number must end with V and must have at least 10 characters" }).min(10).max(20).required(),
        'Gender':Joi.required(),
        'Email': Joi.string().regex( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required().messages({"string.pattern.base": "Incorrect Email address!" }),
        'Address': Joi.string().required(),
        'Birthday': Joi.date().max('01-01-2005').messages({ 'date.max': `Age must be 18+;"Birthday" must be before or equal to "01-01-2005` }).required()

    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

}


const imageValidation = (fileInput) => {
    var filePath = fileInput.value;
  
    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  
    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type. Only JPG, JPEG & PNG types are supported.");
      fileInput.value = "";
      return false;
    }
  
    return true;
};

const guestLogin = (data) => {
    const UpdateValidationSchema = Joi.object({

        'Refno': Joi.string().required().messages({"string.empty": "Enter Reference number" }),
        'Email': Joi.string().regex( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required().messages({"string.pattern.base": "Incorrect Email address!" }),
       
    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

}

export default {
    ValidateUpdate,
    imageValidation,
    ValidateGuest,
    guestLogin,
    ValidateAircraftTypeAdd,
    ValidateAircraftAdd
}