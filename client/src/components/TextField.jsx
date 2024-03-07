import { useField } from "formik";
import { Form } from "react-bootstrap";

const TextField = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <Form.Group className='mb-2'>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...props}
        {...field}
        isInvalid={meta.touched && meta.error}
      />
      {meta.touched && meta.error && (
        <Form.Control.Feedback type='invalid'>
          {meta.error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextField;
