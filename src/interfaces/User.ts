export default interface UserInterface extends Object {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  type: number;
  avatar?: string;
  phone?: string;
  bio?: string;
}
