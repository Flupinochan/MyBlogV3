import type { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { IContactRequest, IContactResponse } from "../../../src/interfaces/ContactInterface";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { SESv2Client, SendEmailCommand, SendEmailCommandInput, SendEmailCommandOutput } from "@aws-sdk/client-sesv2";

const config = {
  maxAttempts: 30,
  requestHandler: new NodeHttpHandler({
    connectionTimeout: 900000,
    socketTimeout: 900000,
  }),
};

const sesClient = new SESv2Client(config);

/**
 * お問合せをEmail送信する
 * @param event name, email, messageの3つの引数
 * @returns ステータスコード 200 or 400
 */
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: IContactResponse;
  let statusCode = 400;

  try {
    const body: IContactRequest = event.body ? JSON.parse(event.body) : { error: 'event.bodyが空です' };
    console.log(`リクエストボディ: ${JSON.stringify(body)}`);

    const email = "flupino@metalmental.net";
    const sesInput: SendEmailCommandInput = {
      FromEmailAddress: email,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [
        email
      ],
      Content: {
        Simple: {
          Subject: {
            Data: "ブログからお問合せがありました",
            Charset: "UTF-8"
          },
          Body: {
            Text: {
              Data: `名前: ${body.name}\nメールアドレス: ${body.email}\nお問合せ内容: ${body.message}`,
              Charset: "UTF-8"
            }
          }
        }
      }
    }

    const sesCommand = new SendEmailCommand(sesInput);
    const sesResponse: SendEmailCommandOutput = await sesClient.send(sesCommand);

    statusCode = sesResponse.$metadata.httpStatusCode ?? 400;
    console.log(`レスポンスステータス: ${statusCode}`);

    if (statusCode === 200) {
      response = {
        message: "メールの送信に成功しました"
      };
    } else {
      response = {
        message: "メールの送信に失敗しました"
      };
    }

  } catch (error) {
    response = {
      message: "メールの送信に失敗しました"
    };
  }

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    statusCode: statusCode,
    body: JSON.stringify(response),
  };
};