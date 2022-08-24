
// wrapper for our Lambda functions. It takes our Lambda function as the argument.
export default function handler(lambda) {
    return async function (event, context) {
      let body, statusCode;
  
      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (e) {
        console.error(e);
        body = { error: e.message };
        statusCode = 500;
      }
  
      // Return HTTP response
      return {
          statusCode,
          body: JSON.stringify(body),
          // Add the CORS headers in our Lambda function response (otherwise will get the error: No 'Access-Control-Allow-Origin')
          // This ensure that if our Lambda functions are invoked through API Gateway, it’ll respond with the proper CORS config.
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    };
  }