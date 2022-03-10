const loginFormValidation = (userData) => {

      let errors = {}
      if (userData.username === "") {
            errors.username = "*userName is required";
      }

      if (userData.password === "") {
            errors.password = "*Password is required";

      } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/.test(userData.password)) {
            errors.password = "*Password format Wrong ";
      }
      if (userData.role === "") {
            errors.role = "*Please Select Role"
      }

      return errors;
}

export default loginFormValidation