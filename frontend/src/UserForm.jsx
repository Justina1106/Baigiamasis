import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { createUser } from "./api/users";


const UserForm = ({handleAddUser}) => {
const handleSubmit = async (values) => {
    
try {
    const response = await createUser(values);
    handleAddUser(response);
} catch (error) {
    console.error(error);
    
}
};   


 return (
       <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
        <Form>
            <Field name="name" placeholder="Enter name..." />
            <button type="submit">Submit user</button>
        </Form>
       </Formik>
    );
};

UserForm.PropTypes = {
  handleAddUser: PropTypes.func.isRequired,
};

export default UserForm;