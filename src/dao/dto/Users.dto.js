export default class UserDTO {
    static RequestDTOFrom = (user) =>{
        return {
            fullname: `${user.first_name} ${user.last_name}`,
            username: user.username || 'user',
            mail: user.mail,
            phoneNumber : user.phoneNumber,
            image: user.image,
            role: user.role
        }
    }

    static LoginDTOFrom = (user) => {
        return {
            id: user.id || '0',
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            fullname: `${user.first_name} ${user.last_name}` || '',
            mail: user.mail,
            phoneNumber: user.phoneNumber || '',
            image: user.image || '',
            role: user.role || 'admin'
        }
    }

    static RegisterDTOFrom = (user) => {
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            mail: user.mail,
            phoneNumber: user.phoneNumber,
            password: user.password,
            image: user.image || ''
        }
    }

    static MailRestorePassword = (user, token, url) => {
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            mail: user.mail,
            token: token,
            url: url
        }
    }
}