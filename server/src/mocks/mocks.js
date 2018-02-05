import faker from "faker";
import Photo from "../models/Photo";
import User from "../models/User";

const PHOTOS = 9;

const photo_list = [
  "https://freestocks.org/fs/wp-content/uploads/2016/06/poppies_2-1024x683.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/10/tree_2-1024x683.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2017/05/feather-1024x683.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/07/field_of_cornflowers_3-1024x683.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/11/autumn_barberry-1024x683.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/09/thistle_in_sunset_light_2-1024x683.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2017/05/green_hedge-1024x683.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2015/10/pink_flowers-1024x683.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/07/cute_baby_smiling-1024x683.jpg"
];
export default async () => {
  try {
    await Photo.remove({});
    await User.remove();
    await Array.from({ length: 2 }).forEach(async (_, i) => {
      const user = await User.create({
        username: faker.internet.userName(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: "password"
      });
      await photo_list.forEach(async photo => {
        await Photo.create({
          image_url: photo,
          caption: faker.lorem.paragraphs(),
          user: user._id
        });
      });
    });
  } catch (error) {
    throw new Error("Error in mocks.js file ");
  }
};
