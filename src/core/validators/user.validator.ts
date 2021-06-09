import { NewUserDTO } from "src/api/rest/dtos/newUser.dto";

export class UserValidator{
    newUserValidator(user: NewUserDTO){
        //name check
        if (user.name.length < 2) {
            throw new ValidationError('name is too short');
        }
        if (user.name.length > 20) {
            throw new ValidationError('name is too long');
        }
        //testing email
        if (!this.validateEmail(user.email)) {
            throw new ValidationError('invalid email');
        }
        //testing password
        if (user.password.length < 4) {
            throw new ValidationError('password is too short');
        }
        if (user.password.length > 40) {
            throw new ValidationError('password is too long');
        }
    }

    validateEmail(email: string){
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email)
    }
}