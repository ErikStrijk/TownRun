module.exports = async(url, body) => {

    return await fetch(url, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: body,
    })
    .then(async (response)=> {
      const json = await response.json();
        return json;
      }).then((responseJson) => {

        return responseJson;
            })
      .catch((error) => {
      });

}

