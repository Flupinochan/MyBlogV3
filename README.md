# MetalMental Blog

## service worker test

```bash
npx serve -s dist
```

## Amplify CLI
https://docs.amplify.aws/react/reference/cli-commands/

```bash
npm install
npx ampx sandbox --stream-function-logs
npm run dev
```

## git-secrets

`.git\hooks` に `git secrets` コマンドの実行が記載されていて、コミットが失敗するため、削除する

## typed-css-modules

cssファイルを個別に定義

```
npm install --save-dev typed-css-modules
npx tcm src --watch
```

## windowsのパスエラー
2025-04-13T06:16:37.392Z [INFO]: src/main.tsx(16,23): error TS2307: Cannot find module './features/tool/components/swagger/SwaggerUi.tsx' or its corresponding type declarations.

上記のようなエラーが起きる場合は、以下のコマンドでgitに登録されているパスとwindows上のファイル名が一致しているか確認する
コマンドの結果が出力された場合はリネームし直すか、ファイルをバックアップして再作成する

```bash
git ls-files | grep -i history
```