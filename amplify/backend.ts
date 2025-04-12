import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { Stack } from "aws-cdk-lib";
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { contactLambda } from './functions/ses/resource';

const backend = defineBackend({
  auth,
  data,
  contactLambda
});

////////////////////////////
/// API Gateway & Lambda ///
////////////////////////////
const apiStack = backend.createStack("api-stack");

const myRestApi = new apigateway.RestApi(apiStack, "RestApi", {
  restApiName: "MyBlogV3",
  deploy: true,
  deployOptions: {
    stageName: "prod",
  },
  defaultCorsPreflightOptions: {
    allowOrigins: apigateway.Cors.ALL_ORIGINS,
    allowMethods: apigateway.Cors.ALL_METHODS,
    allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
  },
});

const contactLambdaFunction = backend.contactLambda.resources.lambda;
const contactLambdaFunctinIAMPolicy = new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: ["ses:SendEmail"],
  resources: ["*"],
});
contactLambdaFunction.addToRolePolicy(contactLambdaFunctinIAMPolicy);

const lambdaIntegration = new apigateway.LambdaIntegration(
  contactLambdaFunction
);

const contactPath = myRestApi.root.addResource("contact");
const contactRequestModel = myRestApi.addModel("ContactRequestModel", {
  contentType: "application/json",
  modelName: "ContactRequestModel",
  schema: {
    type: apigateway.JsonSchemaType.OBJECT,
    required: ["name", "email", "message"],
    properties: {
      name: { type: apigateway.JsonSchemaType.STRING },
      email: { type: apigateway.JsonSchemaType.STRING },
      message: { type: apigateway.JsonSchemaType.STRING },
    },
  },
});
const contactResponseModel = myRestApi.addModel('ContactResponseModel', {
  contentType: 'application/json',
  modelName: 'ContactResponseModel',
  schema: {
    type: apigateway.JsonSchemaType.OBJECT,
    required: ['message'],
    properties: {
      message: { type: apigateway.JsonSchemaType.STRING },
    },
  },
});
contactPath.addMethod("POST", lambdaIntegration, {
  requestModels: {
    'application/json': contactRequestModel,
  },
  methodResponses: [
    {
      statusCode: '200',
      responseModels: {
        'application/json': contactResponseModel,
      },
      responseParameters: {
        'method.response.header.Content-Type': true,
      },
    },
    {
      statusCode: '400',
      responseModels: {
        'application/json': contactResponseModel,
      },
      responseParameters: {
        'method.response.header.Content-Type': true,
      },
    },
  ],
  authorizationType: apigateway.AuthorizationType.NONE,
});
contactPath.addProxy({
  anyMethod: true,
  defaultIntegration: lambdaIntegration,
});

// amplify_outputs.jsonにAPI Endpointを出力
backend.addOutput({
  custom: {
    API: {
      [myRestApi.restApiName]: {
        endpoint: myRestApi.url,
        region: Stack.of(myRestApi).region,
        apiName: myRestApi.restApiName,
      },
    },
  },
});