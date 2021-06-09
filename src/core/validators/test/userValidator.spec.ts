import { NewUserDTO } from "src/api/rest/dtos/newUser.dto";
import { UserValidator } from "../user.validator"

describe('new user validation', () => {
    const validator = new UserValidator();

    test('name should be too short', () => {
        const user: NewUserDTO = {name: 'a', email: '', password: '', isAdmin: false};
        expect(validator.newUserValidator(user)).toThrowError(ValidationError);
    });
});