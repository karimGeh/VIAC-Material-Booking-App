import { UserTypes } from "../enums/UserTypes";

class ACCESS {
  // static
  static get login(): UserTypes[] {
    return [
      UserTypes.admin,
      UserTypes.normal,
      UserTypes.guest,
      UserTypes.superAdmin,
    ];
  }
}

export default ACCESS;
