// import { getUser } from "@/api/users/controller";

// const data: any | any[] = getUser();

export const written = async () => {
    // console.log("🚀 ~ data:", await data)

}

export const redden = async (parameters: any) => {
    const { email } = parameters
    // console.log("🚀 ~ data:", await data)
    //     const returnData = {
    //         fullname: 'Nicolas Contigliani',
    //         id: '1',
    //         email: 'nico.contigliani',
    //         mailSecretKey: 'your_mail_secret_key',
    //         calendarUser: 'your_calendar_user',
    //         calendar_key: 'your_calendar_key',
    //         phone:'+1234567890',
    //         configuration:'{"theme": "dark", "language": "en"}',
    //         extraData:'{"custom_data": "some_value"}' 
    //    }

    const stringReturn: string = "{\"fullname\": \"Nicolas Contigliani\", \"id\": \"1\", \"email\": \"nico.contigliani\", \"mailSecretKey\": \"your_mail_secret_key\", \"calendarUser\": \"your_calendar_user\", \"calendar_key\": \"your_calendar_key\", \"phone\": \"+1234567890\", \"configuration\": \"{\\\"theme\\\": \\\"dark\\\", \\\"language\\\": \\\"en\\\"}\", \"extraData\": \"{\\\"custom_data\\\": \\\"some_value\\\"}\"}"
    const obj = JSON.parse(stringReturn);
    // console.log("🚀 ~ redden ~ obj:", obj)




}