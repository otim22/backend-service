export const loginValidation = {
    // name: {
    //     exists: {
    //         errorMessage: "User name is required",
    //         options: { checkFalsy: true },
    //     },
    //     isString: { errorMessage: "User name should be string" },
    // },
    password: {
        exists: { errorMessage: "Password is required" },
        isString: { errorMessage: "password should be string" },
        isLength: {
            options: { min: 6 },
            errorMessage: "Password should be at least 6 characters",
        },
        matches: { 
            options: /[-_$#]/,
            errorMessage: "Password should contain some symblos",
        },
    },
    email: {
        isEmail: { errorMessage: "Please provide valid email" },
    }
};