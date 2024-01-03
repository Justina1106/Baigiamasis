import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
    year: Yup.number().integer("Age must be an integer").required("Age is required"),
  });

 return (
       <Formik initialValues={{ name: "", email: "", year: "" }} onSubmit={handleSubmit}>
        <Form>
        <div className="forma">
        <h1>Renginių Organizavimo Programa</h1>
          <label htmlFor="name">Vardas ir Pavardė:</label>
          <Field type="text" id="name" name="name" placeholder="Įveskite vardą ir pavardę..." />
          <ErrorMessage name="name" component="div" />
        </div>
        <div className="forma">
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" placeholder="Įveskite email..." />
          <ErrorMessage name="email" component="div" />
        </div>
        <div className="forma">
          <label htmlFor="year">Gimimo data:</label>
          <Field type="number" id="year" name="year" placeholder="Įveskite gimimo datą..." />
          <ErrorMessage name="year" component="div" />
        </div>
            <button type="submit">Pateikti vartotoją</button>
            
        </Form>
       </Formik>
    );
};

UserForm.propTypes = {
    handleAddTask: PropTypes.func.isRequired,
};

export default UserForm;