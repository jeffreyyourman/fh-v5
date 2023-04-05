module.exports.handler = async function (event, context) {
 
  return {
    // return null to show no errors
    statusCode: 200, // http status code
    body: JSON.stringify({
      msg: "this is some bullshit 24",
    }),
  };
};
