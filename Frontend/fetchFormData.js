module.exports = async(url, body) => {

    return await fetch(url, {
        method: 'POST',
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

