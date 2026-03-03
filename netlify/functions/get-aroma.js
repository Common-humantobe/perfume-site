exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "get-aroma function is working 🌿"
    })
  };
};
