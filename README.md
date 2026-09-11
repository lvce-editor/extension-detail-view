# Extension Detail View

Webworker for the extension detail view in Lvce Editor.

## Contributing

```sh
git clone git@github.com:lvce-editor/extension-detail-view.git &&
cd extension-detail-view &&
npm ci &&
npm test
```

Run `npm run dev` to build and watch the local worker and start the development server.
The server links `.tmp/dist` with `--link`, so it uses your local worker without modifying installed packages.

Run `npm run build && npm run e2e:headless` to test the local worker.

## Credits

The extension detail view is based on VSCode's extension detail view.
