//const url = "http://"+window.location.hostname+":5000/"
const url = "https://api.callet.tk/"

export async function registerUser (json) {
  let output = await fetch(url + "users/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json)
  })
    .then((response) => response.json())
    .then((myJson) => {
      return myJson
    });
  return output
}

export async function auth (username, password) {
  let output = await fetch(url + "auth", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password
    }),
  })
    .then((response) => response.json())
    .then((myJson) => {
      return myJson
    });
  return output
}

export async function getCardsList () {
  let output = await fetch(url + "users/" + localStorage.getItem("username") + "/cards/", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
  })
    .then((response) => response.json())
    .then((myJson) => {
      return myJson
    });
  return output
}

export async function createCard (json) {
  let output1 = await fetch(url + "cards/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(json),
  })
    .then((response) => response.json())
    .then((myJson) => {
      return myJson
    });

  if (output1["success"] == 1) {
    let output2 = await fetch(url + "users/" + localStorage.getItem("username") + "/cards/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ "cid": output1["_id"] })
    })
      .then((response) => response.json())
      .then((myJson) => {
        return myJson
      });
    return output2
  }
  else {
    return output1
  }
}

export async function deleteCard (cid) {
  let output = await fetch(url + "users/" + localStorage.getItem("username") + "/cards/", {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ "cid": cid })
  })
    .then((response) => response.json())
    .then((myJson) => {
      return myJson
    });
  return output
}

export async function collectCard (cid) {
  let output = await fetch(url + "users/" + localStorage.getItem("username") + "/cards/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ "cid": cid })
  })
    .then((response) => response.json())
    .then((myJson) => {
      return myJson
    });
  return output
}
