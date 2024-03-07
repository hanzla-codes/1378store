import { Alert as BsAlert } from "react-bootstrap";
const AlertMessage = ({ variant = "danger", children }) => {
  return <BsAlert variant={variant}>{children}</BsAlert>;
};

export default AlertMessage;
