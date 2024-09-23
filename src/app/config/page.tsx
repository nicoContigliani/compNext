"use client"
import React, { useState } from 'react'
import { useForm, SubmitHandler, UseFormGetValues } from 'react-hook-form';
import InputField from '@/components/inputs/InputField';
import Forms from '@/components/Formulary/Forms';



const Configuration = () => {

    const [data, setData] = useState<any[] | undefined>()

    // {
    //     name = "username"
    //     label = "Username"
    //     type = "text"
    //     value = { data.username || '' }
    //     onChange = { handleInputChange }
    //     placeholder = "Enter your username"
    // }

    const inputBeforeGenerate: any[] = [
        {
          "name": "fullname",
          "label": "Full Name",
          "type": "text",
          "placeholder": "Enter your full name"
        },
        {
          "name": "id",
          "label": "ID",
          "type": "text",
          "placeholder": "Enter your ID"
        },
        {
          "name": "email",
          "label": "Email",
          "type": "email",
          "placeholder": "Enter your email"
        },
        {
          "name": "mailSecretKey",
          "label": "Mail Secret Key",
          "type": "password",
          "placeholder": "Enter your mail secret key"
        },
        {
          "name": "calendarUser",
          "label": "Calendar User",
          "type": "text",
          "placeholder": "Enter your calendar user"
        },
        {
          "name": "calendar_key",
          "label": "Calendar Key",
          "type": "password",
          "placeholder": "Enter your calendar key"
        },
        {
          "name": "phone",
          "label": "Phone",
          "type": "tel",
          "placeholder": "Enter your phone number"
        },
        {
          "name": "configuration",
          "label": "Configuration",
          "type": "text",
          "placeholder": "Enter your configuration JSON"
        },
        {
          "name": "extraData",
          "label": "Extra Data",
          "type": "text",
          "placeholder": "Enter extra data JSON"
        }
      ];
      


    return (
        <div>
            <h2>Configuration</h2>
            <Forms
                setData={setData}
                data={data}
                inputBeforeGenerate={inputBeforeGenerate}
            />


        </div>
    )
}

export default Configuration