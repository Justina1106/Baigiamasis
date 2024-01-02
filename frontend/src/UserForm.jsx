import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { createUser } from "./api/users";
import { createTask } from "./api/tasks";
import "./UserForm.css";



const UserForm = ({handleAddTask}) => {
const handleSubmit = async (values) => {
    
try {
    const response = await createTask(values);
    handleAddTask(response);
} catch (error) {
    console.error(error);
    
}
};   

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    age: Yup.number().integer("Age must be an integer").required("Age is required"),
  });

 return (
       <Formik initialValues={{ name: "", email: "", age: "" }} onSubmit={handleSubmit}>
        <Form>
        <div className="forma">
        <h1>Renginių Organizavimo Programa</h1>
          <label htmlFor="name">Vardas ir Pavardė:</label>
          <Field type="text" id="name" name="name" placeholder="Enter name and surname..." />
          <ErrorMessage name="name" component="div" />
        </div>
        <div className="forma">
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" placeholder="Enter email..." />
          <ErrorMessage name="email" component="div" />
        </div>
        <div className="forma">
          <label htmlFor="age">Amžius:</label>
          <Field type="number" id="age" name="age" placeholder="Enter age..." />
          <ErrorMessage name="age" component="div" />
        </div>
            <button type="submit">Submit user</button>
            
        </Form>
       </Formik>
    );
};

UserForm.propTypes = {
    handleAddTask: PropTypes.func.isRequired,
};

export default UserForm;