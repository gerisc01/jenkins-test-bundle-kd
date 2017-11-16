# Management Space Support Console

This page has instructions on how to configure the Support Kapp to use a React bundle, both for development and in production.

## JSP Bundle

- **Bundle Path**: support
- **Kapp Display Page**:
- **Form Display Page**:
- **Form Confirmation Page**:

## React Bundle - Development

- **Bundle Path**: webpack
- **Kapp Display Page**: webpack.jsp?bundleName=manage-support
- **Form Display Page**:
- **Form Confirmation Page**:

## React Bundle - Production

First build the distribution files with the bash command:

```bash
    yarn run build
```

Next create a folder (manage-support) in an S3 bucket.  In kinops, folder should be created in the `kinops.io` bucket, within the `bundles` folder.

Then upload the contents of the `dist` directory that was created from the `yarn run build` command.

Finally, configure the Kapp with the following settings:

- **Bundle Path**: webpack
- **Kapp Display Page**: webpack.jsp?bundleName=manage-support&location=https://s3.amazonaws.com/kinops.io/bundles/manage-support
- **Form Display Page**:
- **Form Confirmation Page**:
