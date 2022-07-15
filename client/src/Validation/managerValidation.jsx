import Joi from 'joi';


const ValidateFlightPassengers = (data) => {
    const UpdateValidationSchema = Joi.object({

        'Flight No': Joi.string().required(),
        'Age Type':Joi.string().required()
    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

    

}


const ValidateAllPassengers = (data) => {
    const UpdateValidationSchema = Joi.object({
        'Destination Id': Joi.string().required(),
        'Start Date':Joi.date().required().min('01-01-1900'),
        'End Date':Joi.date().min('01-01-1900').min(Joi.ref('Start Date')).required()
    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

}

const ValidateAllBookings = (data) => {
    const UpdateValidationSchema = Joi.object({
        'Age Type':Joi.string().required(),
        'Class Id': Joi.string().required(),
        'Start Date':Joi.date().required().max('now').min('01-01-1900'),
        'End Date':Joi.date().max('now').min('01-01-1900').min(Joi.ref('Start Date')).required()
    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

}
const ValidateRevenue= (data) => {
    const UpdateValidationSchema = Joi.object({
        'AirCraft Id':Joi.string().required()

    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

}

const ValidatePastFlights= (data) => {
    const UpdateValidationSchema = Joi.object({
        'Origin Id':Joi.string().required(),
        'Destination Id':Joi.string().required()

    })
    const { error, value } = UpdateValidationSchema.validate(data, { abortEarly: false });
    return { value, error };

}






export default{
    ValidateFlightPassengers,
    ValidateAllPassengers,
    ValidateAllBookings,
    ValidateRevenue,
    ValidatePastFlights
}