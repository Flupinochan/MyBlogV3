import type { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { AmplifyClient, ListDomainAssociationsCommand, ListBranchesCommand, ListDomainAssociationsCommandOutput, ListBranchesCommandOutput, DomainAssociation, Branch } from "@aws-sdk/client-amplify";
import { DateTime } from "luxon";
import { BranchInfoMap } from "../../../src/interfaces/BlogVersionInterface";

const config = {
  maxAttempts: 30,
  requestHandler: new NodeHttpHandler({
    connectionTimeout: 900000,
    socketTimeout: 900000,
  }),
};
const amplifyClient = new AmplifyClient(config);
const amplifyApplicationId = "d25csu3vso9tmw";

/**
 * AmplifyのBranchごとにデプロイされているブログのバージョンを取得する
 * @param event 
 * @returns 
 */
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: BranchInfoMap[] = [];
  let statusCode = 400;

  try {

    const branchesDomains = await paginateListDomainAssociations();
    const branchesUpdateTime = await paginateListBranches();
    response = extractBranchFQDNsWithUpdateTime(branchesDomains, branchesUpdateTime);
    statusCode = 200;

  } catch (error) {
    console.log(error);
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

/**
 * Amplifyで利用されているブランチ: ドメイン情報を取得
 * @param input Amplify AppId
 * @returns 
 */
const paginateListDomainAssociations = async () => {
  let nextToken;
  const branchesDomains = [];
  do {
    const command = new ListDomainAssociationsCommand({
      appId: amplifyApplicationId,
      nextToken: nextToken
    });
    const response: ListDomainAssociationsCommandOutput = await amplifyClient.send(command);
    branchesDomains.push(...(response.domainAssociations || []));
    nextToken = response.nextToken;
  } while (nextToken);
  return branchesDomains;
};

/**
 * Amplifyで利用されているブランチ: UpdateTime情報を取得
 * @param input Amplify AppId
 * @returns 
 */
const paginateListBranches = async () => {
  let nextToken;
  const branchesUpdateTime = [];
  do {
    const command = new ListBranchesCommand({
      appId: amplifyApplicationId,
      nextToken: nextToken,
    });
    const response: ListBranchesCommandOutput = await amplifyClient.send(command);
    branchesUpdateTime.push(...(response.branches || []));
    nextToken = response.nextToken;
  } while (nextToken);
  return branchesUpdateTime;
};

/**
 * vX-X-X形式のブランチ名のドメインに対して、
 * ブランチ名をキーとした { fqdn, updateTime } オブジェクトを返す関数
 *
 * @param {object} branchesDomains
 * @param {object} branchesUpdateTime
 * @returns {object} ブランチ名をキーとした { fqdn, updateTime } のオブジェクト
 */
function extractBranchFQDNsWithUpdateTime(
  branchesDomains: DomainAssociation[],
  branchesUpdateTime: Branch[]
): BranchInfoMap[] {

  const result: BranchInfoMap[] = [];
  const domainName = branchesDomains?.[0]?.domainName ?? '';

  const updateTimeMap: Record<string, string> = {};
  branchesUpdateTime.forEach(branch => {
    if (branch.updateTime) {
      updateTimeMap[branch.branchName!] = formatToJST(branch.updateTime);
    }
  });

  branchesDomains?.[0]?.subDomains?.forEach(subDomain => {
    const { branchName, prefix } = subDomain.subDomainSetting || {};
    // v数値-数値-数値 形式のドメインのみ取得 ※www.は除外
    if (/^v\d+-\d+-\d+/.test(prefix || '')) {
      // https://を付けたFQDNとJSTにしたupdateTimeのobjectを作成
      result.push({
        branchName: branchName || '',
        fqdn: `https://${prefix}.${domainName}`,
        updateTime: updateTimeMap[branchName || ''] ?? null
      });
    }
  });

  return result;
}

/**
 * JSTの'yyyy-MM-dd HH:mm:ss'形式に変換
 */
function formatToJST(utcTime: Date): string {
  return DateTime
    .fromJSDate(utcTime)
    .setZone('Asia/Tokyo')
    .toFormat('yyyy-MM-dd HH:mm:ss');
}
