import { setSeederFactory } from "typeorm-extension";
import { UserEntity } from "../../Models/userModel";
import { Faker } from "@faker-js/faker";

export default setSeederFactory(UserEntity, (faker: Faker) => {
    const user = new UserEntity();
    user.username = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;

})