"use client"
// import { generateToken } from '@/services/jwt.services';
import React, { useState } from 'react';




const Forms = (props: any|undefined) => {
  const { data, setData, inputBeforeGenerate } = props

  const [formData, setFormData] = useState<any>({});



  // Función que manejará el cambio de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderInput = (input: any) => {
    switch (input.type) {
      case 'text':
        return (
          <input
            type="text"
            name={input?.name}
            placeholder={input?.placeholder}
            value={formData[input?.name] || ''}
            onChange={handleChange}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            name={input?.name}
            placeholder={input?.placeholder}
            value={formData[input?.name] || ''}
            onChange={handleChange}
            step={input?.step}
            min={input?.min}
            max={input?.max}
          />
        );
      case 'tel':
        return (
          <input
            type="tel"
            name={input?.name}
            placeholder={input?.placeholder}
            value={formData[input?.name] || ''}
            onChange={handleChange}
            step={input?.step}
            min={input?.min}
            max={input?.max}
          />
        );

      case 'range':
        return (
          <>
            <input
              type="range"
              name={input?.name}
              placeholder={input?.placeholder}
              value={formData[input?.name] || ''}
              onChange={handleChange}
              step={input?.step}
              min={input?.min}
              max={input?.max}
            />
            {formData[input?.name]}
          </>
        );



      case 'password':
        return (
          <input
            type="password"
            name={input?.name}
            placeholder={input?.placeholder}
            value={formData[input?.name] || ''}
            onChange={handleChange}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            name={input?.name}
            placeholder={input?.placeholder}
            value={formData[input?.name] || ''}
            onChange={handleChange}
          />
        );

      case 'search':
        return (
          <input
            type="search"
            name={input?.name}
            placeholder={input?.placeholder}
            value={formData[input?.name] || ''}
            onChange={handleChange}
          />
        );

      case 'select':
        return (
          <select
            name={input.name}
            value={formData[input.name] || ''}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            {input?.options?.map((option: any, idx: number) => (
              <option key={idx} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        );
      default:
        return null; // Manejar otros tipos en el futuro
    }
  };

  const saveData = () => {
    // const tokenReturn = generateToken({ id: 1, fullname: "Nicolas" })
    // console.log("🚀 ~ saveData ~ tokenReturn:", tokenReturn)
  }


  return (

    <>
      {inputBeforeGenerate?.map((input: any, index: any) => (
        <div key={index}>
          <label htmlFor={input.name}>{input.label}</label>
          {renderInput(input)}
        </div>
      ))}

      {/* Muestra los datos ingresados */}
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <button onClick={() => saveData()}>Submit</button>
    </>
  );
};

export default Forms;









// const inputBeforeGenerate: any[] | undefined = [
//   {
//       "name": "username",
//       "label": "Username",
//       "type": "text",
//       "placeholder": "Enter your username"
//   },
//   {
//       "name": "nickname",
//       "label": "nickname",
//       "type": "text",
//       "placeholder": "Enter your nickname"
//   },
//   {
//       "name": "range",
//       "label": "number",
//       "type": "range",
//       "placeholder": "Enter your nickname",
//       "min": 0,
//       "max": 100,
//       "step": "10"
//   },
//   {
//       "name": "password",
//       "label": "Password",
//       "type": "password", // Este es correcto
//       "placeholder": "Enter password"
//   },
//   {
//       "name": "color", // Se agregó la coma aquí
//       "label": "Favorite Color", // Cambié "labels" a "label"
//       "type": "select",
//       "options": [ // Quité las llaves adicionales que estaban de más
//           { "label": 'Red', "value": 'red' },
//           { "label": 'Blue', "value": 'blue' },
//           { "label": 'Green', "value": 'green' }
//       ]
//   }];