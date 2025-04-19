import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { contactLambda } from './functions/contact/resource';
import { blogVersionLambda } from './functions/blog-version/resource';
import { configureApiGateway } from './cdk/apigateway';

export const backend = defineBackend({
  auth,
  data,
  contactLambda,
  blogVersionLambda
});

configureApiGateway(backend);