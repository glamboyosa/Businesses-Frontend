import { authenticationService } from "../login";
import { Redirect } from "react-router-dom";
export function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        //automatically log the user out if atatus codes
        //are 401 or 403
        authenticationService.logout();

        // location.reload(true);
      }
      const error = (data && data.message) || response.statusText;

      return Promise.reject(error);
    }

    return data;
  });
}
