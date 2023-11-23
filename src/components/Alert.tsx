interface AlertProps {
  message: string;
}

// Alert component without React.FC, with return type annotated as JSX.Element
const Alert = ({ message }: AlertProps): JSX.Element => {
  return (
    <div className="mb-4 text-center p-2 text-red-600 bg-red-100 rounded">
      {message}
    </div>
  );
};

export default Alert;
