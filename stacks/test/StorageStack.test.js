import { Template } from "aws-cdk-lib/assertions";
import { App, getStack } from "@serverless-stack/resources";
import { StorageStack } from "../StorageStack";
import { test } from "vitest";


// This is a very simple CDK test that checks if our storage stack creates a DynamoDB table and that the table’s billing mode is set to PAY_PER_REQUEST
// This is the default setting in SST’s Table construct.
// This test is making sure that we don’t change this setting by mistake.
test("Test StorageStack", () => {
  const app = new App();
  // WHEN
  app.stack(StorageStack);
  // THEN
  const template = Template.fromStack(getStack(StorageStack));
  template.hasResourceProperties("AWS::DynamoDB::Table", {
    BillingMode: "PAY_PER_REQUEST",
  });
});