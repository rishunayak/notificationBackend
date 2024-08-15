import Joi from 'joi'

const sendNotificationTypeSchema=Joi.object({
    type:Joi.string()
    .valid('mail', 'sms')
    .required()
    .messages({
        'any.required': 'The notification type is required.',
        'string.empty': 'The notification type cannot be empty.',
        'string.base': 'The notification type must be a string.',
        'any.only': 'The notification type must be one of the following: mail, sms.'
    })
})


const sendNotificationPayloadSchema=Joi.object({
    from: Joi.string()
        .email({ tlds: { allow: false } }) // Validates email format
        .required()
        .messages({
            'string.base': 'The "from" field should be a string.',
            'string.email': 'The "from" field must be a valid email address.',
            'any.required': 'The "from" field is required.'
        }),
    to: Joi.string()
        .email({ tlds: { allow: false } }) // Validates email format
        .required()
        .messages({
            'string.base': 'The "to" field should be a string.',
            'string.email': 'Invalid email id',
            'any.required': 'The "to" field is required.'
        }),
    subject: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.base': 'The "subject" field should be a string.',
            'string.min': 'The "subject" field must have at least 3 character.',
            'string.max': 'The "subject" field must have at most 255 characters.',
            'any.required': 'The "subject" field is required.'
        }),
    text: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.base': 'The "text" field should be a string.',
            'string.min': 'The "text" field must have at least 1 character.',
            'any.required': 'The "text" field is required.'
        }),
    html: Joi.string()
        .optional()
        .messages({
            'string.base': 'The "html" field should be a string if provided.'
        })

})


const dbIdSchema = Joi.object({
    id: Joi.string()
        .length(24)  // Ensures the string length is exactly 24 characters
        .required()
        .messages({
            'any.required': 'The ID is required.',
            'string.empty': 'The ID cannot be empty.',
            'string.base': 'The ID must be a string.',
            'string.length': 'Invalid Notification Id'
        })
});
const sendNotificationTypeValidate = (payload) =>{
    return sendNotificationTypeSchema.validate(payload)
}

const sendNotificationPayloadValidate = (payload) =>{
    return sendNotificationPayloadSchema.validate(payload)
}

const dbIdValider=(payload)=>{
    return dbIdSchema.validate(payload)
}
export  {sendNotificationTypeValidate,sendNotificationPayloadValidate,dbIdValider}