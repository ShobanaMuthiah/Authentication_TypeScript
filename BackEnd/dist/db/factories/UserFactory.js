import { setSeederFactory } from "typeorm-extension";
import { User } from "../../Models/userModel.js";
export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.username = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
});
