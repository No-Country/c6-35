
export function validateName(name:String | undefined | null) {
    return (name && name.match(/^[a-zA-Z]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$/g) !== null)
}

export function validateDNI(dni:String | undefined | null) {
    return (dni && dni.match(/^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/g) !== null)
}

export function validateNroLegajo(legajo:String | undefined | null) {
    return (legajo && legajo.match(/^[\d]{1,6}$/g) !== null)
}

export function validatePhone(phone:String | undefined | null){
    return (phone && phone.match(/^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g) !== null)
}

export function validateEmail(email:String | undefined | null){
    return (email && email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) !== null)
}

export function validatePassword(password:String | undefined | null){
    return (password && password.match(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/g) !== null)
}
