import React from "react";

interface IFormErrorProps {
    errorMessage: string | undefined;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {    
    return (
        <div className="form-error">{errorMessage}</div>
    );
}