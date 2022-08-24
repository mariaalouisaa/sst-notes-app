import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  //  references the table resource from the StorageStack
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
        // This tells our API that we want to use AWS_IAM across all our routes.
      authorizer: "iam",
      function: {
        // giving our API permission to access our DynamoDB table
        permissions: [table],
        environment: {
          //passing in the name of our DynamoDB table
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
    },
    routes: {
      // route to create a note
      "POST /notes": "functions/create.main",
      // route to get specific note
      "GET /notes/{id}": "functions/get.main",
      // route to get all notes
      "GET /notes": "functions/list.main",
      // route  for the get note API (get.js)
      "PUT /notes/{id}": "functions/update.main",
      // route to delete a note
      "DELETE /notes/{id}": "functions/delete.main",
      // route for billing API (stripe)
      "POST /billing": "functions/billing.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
