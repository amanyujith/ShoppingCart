import React from 'react';

interface ButtonProps {
  value: string;
  onClick: () => void;  
  cl?: string;          
}

const Button: React.FC<ButtonProps> = ({ value, onClick, cl }) => {
  return (
    <button 
      onClick={onClick} 
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full ${cl}`}
    >
      {value}
    </button>
  );
};

export default Button;
