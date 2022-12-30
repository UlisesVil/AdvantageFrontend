export class UserDataModel{
  constructor(
    public userId: String,
    public userName: String,
    public lastName: String,
    public secondSurName: String,
    public email: String,
    public birthDate: Date
  ){ }
}
