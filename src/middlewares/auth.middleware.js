import config from "../config/config.js";

export const privateValidation = (req, res, next) => {
    try {
        const reqUser = res.cookie + "." + config.jwt.cookie;
        if(!reqUser) return res.redirect('/login')
        next()
    } catch (error) {
        res.redirect('/login')
    }
}

export const executePolicies = (policies) => {
    return (req, res, next) => {
        if(policies[0].toUpperCase() === 'PUBLIC') return next();
        const user = res.cookie + "." + config.jwt.cookie 
        if(policies.includes(user.role.toUpperCase())) return next();
        res.redirect('/')
    }
}