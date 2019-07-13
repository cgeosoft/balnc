exports.handler = function (event, context, callback) {
    // your server-side functionality
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            message: `Hello 2 TEST:"${process.env.TEST}" - ${Math.floor(Math.random() * 10)}`
        })
    });
};