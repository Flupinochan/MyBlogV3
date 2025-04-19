import { defineFunction } from "@aws-amplify/backend";

export const blogVersionLambda = defineFunction({
  name: "blog-version-amplify",
  entry: "./handler.ts",
  timeoutSeconds: 30,
  memoryMB: 512,
});