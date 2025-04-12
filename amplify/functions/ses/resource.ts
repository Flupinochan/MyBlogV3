import { defineFunction } from "@aws-amplify/backend";

export const contactLambda = defineFunction({
  name: "contact-ses",
  entry: "./handler.ts",
  timeoutSeconds: 30,
  memoryMB: 512,
});