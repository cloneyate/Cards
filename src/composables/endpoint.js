//const url = "http://" + window.location.hostname + ":8000"
const url = "https://api.callet.tk"

export async function registerUser (json, password) {
  let output = await fetch(url + "/users/?password=" + password, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json)
  })
    .then((response) => response.json())
    .then((myJson) => {
      console.log(myJson)
      return myJson
    });
  return output
}

export async function auth (username, password) {
  let output = await fetch(url + "/token", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `username=${username}&password=${password}`,
  })
    .then((response) => response.json())
    .then((myJson) => {
      console.log(myJson)
      return myJson
    });
  return output
}

export async function collectCard (cid) {
  let output = await fetch(url + "/users/me/cards/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
    },
    body: JSON.stringify({
      "_id": cid,
      "bookmarked": false
    })
  })
    .then((response) => response.json())
    .then((myJson) => {
      console.log(myJson)
      return myJson
    });
  return output
}

export async function getCardsList () {
  let output = await fetch(url + "/users/me/cards/", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
    },
  })
    .then((response) => response.json())
    .then((myJson) => {
      console.log(myJson)
      return myJson
    });
  return output
}

export async function createCard (json) {
  let output1 = await fetch(url + "/cards/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
    },
    body: JSON.stringify(json),
  })
    .then((response) => response.json())
    .then((myJson) => {
      console.log(myJson)
      return myJson
    });

  if (output1["_id"]) {
    let output2 = await collectCard(output1["_id"])
    return output2
  }
  else {
    return output1
  }
}

export async function getCard (cid) {
  let output = await fetch(url + "/cards/" + cid, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
    },
  })
    .then((response) => response.json())
    .then((myJson) => {
      console.log(myJson)
      return myJson
    });
  return output
}

export async function deleteCard (cid) {
  let output = await fetch(url + "/users/me/cards/" + cid, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
    },
  })
    .then((response) => response.json())
    .then((myJson) => {
      console.log(myJson)
      return myJson
    });
  return output
}



export async function getProfile () {
  let output = await fetch(url + "/users/me/", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
    },
  })
    .then((response) => response.json())
    .then((myJson) => {
      console.log(myJson)
      return myJson
    });
  return output
}

export async function bookmarkCard (cid, isBookmarked) {
  let output = await fetch(url + "/users/me/cards/", {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
    },
    body: JSON.stringify({
      "_id": cid,
      "bookmarked": isBookmarked
    })
  })
    .then((response) => response.json())
    .then((myJson) => {
      console.log(myJson)
      return myJson
    });
  return output
}