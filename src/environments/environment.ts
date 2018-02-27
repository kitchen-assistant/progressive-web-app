// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCLA4xEykAgjd2UqqtWIqECCA2dGi82aDQ',
    authDomain: 'kitchen-assistant-8b1db.firebaseapp.com',
    databaseURL: 'https://kitchen-assistant-8b1db.firebaseio.com',
    projectId: 'kitchen-assistant-8b1db',
    storageBucket: 'kitchen-assistant-8b1db.appspot.com',
    messagingSenderId: '84277620801'
  }
};
