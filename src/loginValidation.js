 function Validation(values){
    let error={}
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_pattern=/[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|]/

    if (values.email==="")
    {error.email="Email should be Empty"}
    else if(!emailPattern.test(values.email)){
        error.email=" Email didnt match"
    }
    else{
        error.email=""

    }

    if (values.password==="")
    {error.password="Pwd shouldnt be empty"}
    else if(!password_pattern.test(values.password)){
        error.password=" Pwd didnt match"
    }
    else{
        error.password=""

    }
    return error;

 }

 export default Validation;