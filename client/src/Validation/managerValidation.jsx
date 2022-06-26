import Joi from 'joi';


const ValidateFlightPassengers = (data) => {
    const UpdateValidationSchema = Joi.object({

        'Flight No': Joi.string().required(),
        'Age Type':Joi.string().required()
    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

    

}

export default{
    ValidateFlightPassengers
}