//responsible for passing a user's JWT token in the header on requests
import { authenticationService } from "./login";
export function authcomponent() {
  //return authorization with jwt
  const currentUser = authenticationService.currentUserValue;
  // console.log(currentUser);
  // console.log(currentUser.role);
  console.log(currentUser.token);
  if (currentUser && currentUser.token) {
    return { Authorization: "Bearer" + " " + currentUser.token };
  } else {
    return {};
  }
}
