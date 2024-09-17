export const signUpFormControls = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "John Doe",
    componentType: "input",
    type: "text",
  },
  {
    name: "username",
    label: "Username",
    placeholder: "johndoe",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    componentType: "input",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    componentType: "input",
    type: "password",
  },
  {
    name: "gender",
    label: "Gender",
    componentType: "checkbox",
    options: [
      {
        id: "male",
        label: "Male",
      },
      {
        id: "female",
        label: "Female",
      },
    ],
  },
];

export const loginFormControls = [
  {
    name: "username",
    label: "Username",
    placeholder: "Username",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    componentType: "input",
    type: "password",
  },
];
