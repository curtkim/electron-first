## Howto

    mkdir my-electron-app && cd my-electron-app
    npm init -y
    npm i --save-dev electron

    npm start
    npx @electron-forge/cli import
    # remove @electron-forge/maker-deb from package.json
    npm run make

    # Run in Linux
    out/my-electron-app-linux-x64/my-electron-app

    # Run in macos
    open out/my-electron-app-darwin-x64/my-my-electron-app.app
