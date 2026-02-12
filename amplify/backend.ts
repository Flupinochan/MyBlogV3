import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { configureApiGateway } from "./cdk/apigateway";
import { blogVersionLambda } from "./functions/blog-version/resource";
import { contactLambda } from "./functions/contact/resource";

export const backend = defineBackend({
  auth,
  contactLambda,
  blogVersionLambda,
});

configureApiGateway(backend);
