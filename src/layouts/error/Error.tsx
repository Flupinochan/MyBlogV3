import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // HTTP レスポンスベースのエラー
    return (
      <div>
        <h1>{error.status} - {error.statusText}</h1>
        {error.data && <p>{typeof error.data === 'string' ? error.data : JSON.stringify(error.data)}</p>}
        <p>flupino@metalmental.net までエラーのご報告をお願いいたします。</p>
      </div>
    );
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  ) {
    return (
      <div>
        <h1>エラーが発生しました</h1>
        <p>{(error as Error).message}</p>
        <p>flupino@metalmental.net までエラーのご報告をお願いいたします。</p>
      </div>
    );
  }


  // その他（型不明なケース）
  return (
    <div>
      <h1>不明なエラーが発生しました</h1>
      <p>flupino@metalmental.net までエラーのご報告をお願いいたします。</p>
    </div>
  );
};

export default Error;
