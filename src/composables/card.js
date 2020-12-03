const url = "http://127.0.0.1:5000/api/cards/";
    
export  function deleteCard(cid){
    fetch(url+cid, {
        method: "DELETE",
        mode: "cors",
      })
        .then((response) => response.json());
}

export async function getCard(cid){
  let output=await fetch(url+cid, {
    method: "GET",
    mode: "cors",
  })
      .then((response) => response.json())
      .then((myJson) => {
        return myJson
      });
    return output
}
