import fetch from "isomorphic-fetch";
import { authcomponent } from "../authecomponent";

export function createCategories(data) {
  return fetch("https://localhost:44341/api/categories", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}
export function createUsers(data) {
  return fetch("https://localhost:44341/api/users/create", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}
export function createBusiness(data) {
  return fetch("https://localhost:44341/api/businesslistings/create", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
}
export function fetchBusiness(id) {
  return fetch("https://localhost:44341/api/businesslistings/" + id, {
    method: "GET",
    mode: "cors",
    headers: authcomponent()
  })
    .then(res => res.json())
    .catch(err => err);
}
export function updateBusiness(id, data) {
  return fetch("https://localhost:44341/api/businesslistings/" + id, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}
export function fetchCategories(id) {
  return fetch("https://localhost:44341/api/categories/" + id, {
    method: "GET",
    mode: "cors",
    headers: authcomponent()
  })
    .then(res => res.json())
    .catch(err => err);
}
export function fetchTheCategories(id) {
  return fetch("https://localhost:44341/api/categories/" + id, {
    method: "GET",
    mode: "cors"
  })
    .then(res => res.json())
    .catch(err => err);
}
export function updateCategories(id, data) {
  return fetch("https://localhost:44341/api/categories/" + id, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
}
export function fetchUsers(id) {
  return fetch("https://localhost:44341/api/users/" + id, {
    method: "GET",
    mode: "cors",
    headers: authcomponent()
  })
    .then(res => res.json())
    .catch(err => err);
}
export function fetchTheUsers(id) {
  return fetch("https://localhost:44341/api/users/get/" + id, {
    method: "GET",
    mode: "cors"
  })
    .then(res => res.json())
    .catch(err => err);
}
export function updateUsers(id, data) {
  return fetch("https://localhost:44341/api/users/update/" + id, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
}
export function updateTheUsers(id, data) {
  return fetch("https://localhost:44341/api/users/passwordupdate/" + id, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
}
export function deleteBusiness(id) {
  return fetch("https://localhost:44341/api/businesslistings/" + id, {
    method: "DELETE",
    mode: "cors"
  })
    .then(res => res)
    .catch(err => err);
}
export function deleteCategory(id) {
  return fetch("https://localhost:44341/api/categories/" + id, {
    method: "DELETE",
    mode: "cors"
  })
    .then(res => res)
    .catch(err => err);
}
export function deleteUsers(id) {
  return fetch("https://localhost:44341/api/users/" + id, {
    method: "DELETE",
    mode: "cors"
  })
    .then(res => res)
    .catch(err => {
      console.error("err", err);
    });
}
