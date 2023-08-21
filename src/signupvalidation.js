function Validation(values) {
    let errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       const password_pattern=/[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|]/

    if (!values.name) {
        errors.name = "Name shouldn't be empty";
    }

    if (!values.email) {
        errors.email = "Email shouldn't be empty";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Invalid email format";
    }

    if (!values.password) {
        errors.password = "Password shouldn't be empty";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Invalid password format";
    }

    return errors;
}


 export default Validation;