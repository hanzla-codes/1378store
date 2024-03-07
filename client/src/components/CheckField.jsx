import { useField } from "formik";
import { Form } from "react-bootstrap";

const CheckField = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <Form.Group className='my-4'>
      <Form.Check
        {...props}
        {...field}
        label={label}
        isInvalid={meta.touched && meta.error}
        id={name}
        checked={field.value === true}
      />
      {meta.touched && meta.error && (
        <Form.Check.Feedback type='invalid'>{meta.error}</Form.Check.Feedback>
      )}
    </Form.Group>
  );
};

export default CheckField;
