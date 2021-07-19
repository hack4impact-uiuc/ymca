# YMCA Authentication Server

    nawc.vercel.app/auth

Made from [H4i Infrastructure Authentication Server](https://github.com/hack4impact-uiuc/infra-authentication-server).

## Permission Structure

**admin** can promote or demote:

- _nawc volunteer_
- _public_

**nawc volunteer** can promote or demote:

- _public_

**public** has no ability to promote or demote.

## Reference Links

Documentation: https://www.notion.so/h4iuiuc/Authentication-Server-12c9fa26d1b9457bb84d7105caea530e

API: https://github.com/hack4impact-uiuc/infra-authentication-api/

Guide for Integrating into your App: https://docs.google.com/document/d/1K6e9jarVtAync-Bti6BN6bKI-8JnvwK4IZmhlTSn2pg/edit

Client Example: https://github.com/hack4impact-uiuc/infra-authentication-client

## Usage

```
yarn
yarn start
```

## Deployment

### Zeit Now

This server already comes preconfigured to work with Now, so minimal setup is needed.
Make sure that first you have [Now](https://zeit.co/download) installed on your machine. The current version as of writing this documentation is 15.0.8, and as it's in very rapid development, some of the instructions may change.

Once you create an account and log in via the CLI tool (using `now login`), you must add the secret keys from your environment file.

Open up your `.env` file. In a terminal window, execute the following command, replacing the email value with the email in the `.env` file:

```bash
now secrets add INFRA_EMAIL 'abc.def@gmail.com'
```

Repeat this for every other entry in the `.env` file, but replacing `INFRA_EMAIL` with `INFRA_CLIENT_ID`, `INFRA_CLIENT_SECRET`, etc. and their corresponding values. Make sure you include the single quotes in the command like above!

When you're ready to deploy, run `now` in the repo root and you will be given a link to your deployed docs.

Learn how to alias a deployment [here](https://zeit.co/docs/v2/domains-and-aliases/aliasing-a-deployment).
