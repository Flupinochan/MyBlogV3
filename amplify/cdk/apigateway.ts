import { Stack } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';

export function configureApiGateway(backend: any) {
  // 1) API スタックを作成
  const apiStack = backend.createStack('api-stack');

  // 2) RestApi を定義
  const myRestApi = new apigateway.RestApi(apiStack, 'RestApi', {
    restApiName: 'MyBlogV3',
    deploy: true,
    deployOptions: { stageName: 'prod' },
    defaultCorsPreflightOptions: {
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
      allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
    },
  });

  // 3) Lambda 関数のインスタンス取得
  const contactFn = backend.contactLambda.resources.lambda;
  const versionFn = backend.blogVersionLambda.resources.lambda;

  // 4) IAM ポリシーをアタッチ
  contactFn.addToRolePolicy(new iam.PolicyStatement({
    actions: ['ses:SendEmail'],
    effect: iam.Effect.ALLOW,
    resources: ['*'],
  }));
  versionFn.addToRolePolicy(new iam.PolicyStatement({
    actions: ['amplify:ListBranches', 'amplify:ListDomainAssociations'],
    effect: iam.Effect.ALLOW,
    resources: ['*'],
  }));

  // 5) Lambda インテグレーション
  const contactIntegration = new apigateway.LambdaIntegration(contactFn);
  const versionIntegration = new apigateway.LambdaIntegration(versionFn);

  // 6) /contact と /blog-version リソースを作成
  const contactPath = myRestApi.root.addResource('contact');
  const blogVersionPath = myRestApi.root.addResource('blog-version');

  // 7) API Gateway モデルの定義
  const contactRequestModel = myRestApi.addModel('ContactRequestModel', {
    contentType: 'application/json',
    modelName: 'ContactRequestModel',
    schema: {
      type: apigateway.JsonSchemaType.OBJECT,
      required: ['name', 'email', 'message'],
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
  const blogVersionResponseModel = myRestApi.addModel('BlogVersionResponseModel', {
    contentType: 'application/json',
    modelName: 'BlogVersionResponseModel',
    schema: {
      type: apigateway.JsonSchemaType.ARRAY,  // 配列型
      items: {  // 配列の中身の型を定義
        type: apigateway.JsonSchemaType.OBJECT,
        properties: {
          branchName: { type: apigateway.JsonSchemaType.STRING },
          fqdn: { type: apigateway.JsonSchemaType.STRING },
          updateTime: { type: apigateway.JsonSchemaType.STRING },
        },
      },
    },
  });


  // 8) メソッド定義
  contactPath.addMethod('POST', contactIntegration, {
    requestModels: { 'application/json': contactRequestModel },
    methodResponses: [
      { statusCode: '200', responseModels: { 'application/json': contactResponseModel } },
      { statusCode: '400', responseModels: { 'application/json': contactResponseModel } },
    ],
    authorizationType: apigateway.AuthorizationType.NONE,
  });
  blogVersionPath.addMethod('GET', versionIntegration, {
    methodResponses: [
      { statusCode: '200', responseModels: { 'application/json': blogVersionResponseModel } },
      { statusCode: '400', responseModels: { 'application/json': blogVersionResponseModel } },
    ],
    authorizationType: apigateway.AuthorizationType.NONE,
  });

  // 9) プロキシ設定
  contactPath.addProxy({ anyMethod: true, defaultIntegration: contactIntegration });
  blogVersionPath.addProxy({ anyMethod: true, defaultIntegration: versionIntegration });

  // 10) Outputs にエンドポイント出力
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
}
