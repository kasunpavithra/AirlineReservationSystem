import Joi from 'joi';

const ValidateUpdate = (data) => {
    const UpdateValidationSchema = Joi.object({

        'First Name': Joi.string().regex(/^[A-Z][a-z0-9_-]{2,}$/).messages({ "string.pattern.base": "First letter must be a Capital" }).min(3).max(15),
        'Last Name': Joi.string().regex(/^[A-Z][a-z0-9_-]{2,}$/).messages({ "string.pattern.base": "First letter must be a Capital" }).min(3).max(20).required(),
       // 'NIC': Joi.string().alphanum().regex(/^([0-9]{9}[X|V]|[0-9]{12})$/).messages({ "string.pattern.base": "NIC number must end with V and must have at least 10 characters" }).min(10).max(20).required(),
        'Gender':Joi.string().required(),
        'Contact Number': Joi.string().regex(/^(?:0|(?:\+94))[0-9]{9}$/).messages({ "string.pattern.base": "Contact number must start with 0 or +94 and must have 10 digits" }).length(10).required(),
        
        'Email': Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
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

export default {
    ValidateUpdate,
    imageValidation,
}