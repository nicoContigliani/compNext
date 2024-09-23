import React from 'react';

// Definimos las opciones que puede recibir un select
interface Option {
  label: string;
  value: string | number;
}

// Definimos las props que recibirá el componente
interface InputProps {
  name: string;
  label: string;
  type: InputType;
  value: string | number | boolean;
  onChange: (name: string, value: string | number | boolean) => void;
  placeholder?: string;
  options?: Option[]; // Para el caso de inputs tipo select
  min?: number; // Para inputs de tipo range, number
  max?: number; // Para inputs de tipo range, number
  step?: number; // Para inputs de tipo range
}

// Lista de todos los tipos posibles de input
type InputType =
  | 'text'
  | 'number'
  | 'password'
  | 'email'
  | 'textarea'
  | 'select'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'month'
  | 'week'
  | 'color'
  | 'range'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'hidden';

// Componente DynamicInput
const InputField: React.FC<InputProps> = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  options,
  min,
  max,
  step
}) => {
  // Manejador para el cambio de valor
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    onChange(name, inputValue);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value as string}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
      ) : type === 'select' && options ? (
        <select id={name} name={name} value={value as string | number | undefined} onChange={handleInputChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'checkbox' || type === 'radio' ? (
        <input
          id={name}
          name={name}
          type={type}
          checked={!!value}
          onChange={handleInputChange}
        />
      ) : type === 'range' ? (
        <input
          id={name}
          name={name}
          type={type}
          value={value as number}
          min={min}
          max={max}
          onChange={handleInputChange}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value as any}
          placeholder={placeholder}
          onChange={handleInputChange}
          step={step}
        />
      )}
    </div>
  );
};

export default InputField;
