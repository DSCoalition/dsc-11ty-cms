# Creating the repository

## 1. Clone the project

Navigate into the folder where you would like to host your project and run the following
command to clone:

```
git clone https://github.com/kindsys/eleventy-decap-tailwind-template.git
```

Move into the new directory using the `cd` command:

```
cd eleventy-decap-tailwind-template
```

## 2. Install Node.js and npm

This template requires Node.js version 14 or higher in order to run. You can check whether you have Node installed by running `node --version`
in the terminal. If the command is not found or the version number is less than 14, you will need to download and install the software. You can
download the latest version of Node.js and npm with the following command:

```
npm install -g npm
```


## 3. Install Eleventy

We can now install the static site generator Eleventy. `@11ty/eleventy` is published on npm, so we can install and save it
to our project's `package.json` using:

```
npm install @11ty/eleventy --save-dev
```


## 4. Run the template

Use the following script to test your installations:

```
npm run build
```

There should be multiple lines of output, but the last line should look like this if the run is successful:

```
[11ty] Wrote 13 files in 0.18 seconds (v2.0.1)
```

## 5. View the page

Now we can view our page on a local web server by using the `serve` script:

```
npm run serve
```

Part of your output in the terminal should look like this:

```
[11ty] Server at http://localhost:8080/
```

# Deployment

## Setting up GitHub Pages
 1. Now that our repository is created, we can enable GitHub Pages. Go to the page of the repository you've just created and click on the **Settings** button in the top right. </br></br>

 2. Click on the **Pages** button on the sidebar menu and select your default branch in the dropdown, this is probably `main` or `master`, leave `/(root)` as the selected folder. Click on **save** to confirm the settings.</br></br>

## Build your website with GitHub Actions
1. By default, GitHub pages uses Jekyll to generate your website. In our case, we're using 11ty, so we want to inform GitHub Pages.
  - To do so, create an empty file called `.nojekyll` and put it in the root directory. </br></br>

2. Create `.github` folder also in the ```root``` directory, and inside that folder, create another folder called `workflows` . In this folder, we put the workflows which GitHub Actions execute. </br></br>

3. We're going to create two workflows: </br></br>
Create a file with the name  `build.yml`  </br></br>
This workflow performs a build when a pull request is created.
If your default branch is something other than `main` make sure to change this in the `branches` array. </br>
This workflow only performs a build and does not yet deploy your changes.</br></br>

```
build.yml

name: Build on PR

on:
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: ['14.17.6']

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install packages
      run: npm ci

    - name: Run development build
      run: npm run build:dev
```
</br>

Next create `build-and-deploy.yml`. </br></br>
This workflow builds and deploys our website to GitHub Pages when a push is done on ```main``` branch, for example when you merge a PR. </br></br>

```
name: Build & Deploy

on:
  push:
    branches: ['main']

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: ['14.17.6']

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install packages
        run: npm ci

      - name: Run production build
        run: npm run build:prod

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          publish_dir: _site

```
4. Before we can use this workflow we'll need to create an **ACTIONS_DEPLOY_KEY**. This key is needed to be able to deploy our generated code to GitHub Pages. Follow the steps in these docs to create an ***[ACTIONS_DEPLOY_KEY](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-create-ssh-deploy-key)*** .</br>


Once that is done we can push all the changes to our repository </br></br>

5. Now head over to your repository on GitHub and click on the **Actions** tab on top. You should see the Build & Deploy workflow being executed, once that is done another workflow called ```pages-build-deployment``` is triggered and deploys the generated website to GitHub Pages.</br></br>

6. After the Build & Deploy workflow is executed a new branch called `gh-pages` is auto-created. In this branch the generated output of your 11ty site will be stored. To be able to host the website properly we need to inform GitHub Pages about this.</br> Navigate to the **Settings** tab and select **Pages** in the list on the left. Change the branch from which your GitHub Pages site is currently being built to `gh-pages` and `root` and hit **save**.</br></br>

7. The ```pages-build-deployment``` workflow will be automatically triggered again and after it has finished you can navigate to the URL where your website is published to see the final result.</br></br>

## Additional Resources:
***[How to Deploy your Eleventy Website to GitHub Pages with GitHub Actions](https://maarten.be/blog/20220730/how-to-deploy-your-eleventy-website-to-github-pages-with-github-actions/)*** </br></br>

***[Actions with GitHub Pages](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-create-ssh-deploy-key)***

# DecapCMS Integration

## Adding DecapCMS to Existing GitHub Pages Site
## 1. Creating an GitHub OAuth App
Go to ***[GitHub Dev Settings](https://github.com/settings/developers)*** and click **New OAuth App**. Enter anything you like for **Application name** and **Homepage URL**.</br></br>

Next, In **Authorization callback URL**, enter: `https://api.netlify.com/auth/done`</br></br>

You will need the **Client ID** and **Client Secret** on this page later.</br></br>
## 2. Creating a Netlfiy Site

Go to ***[Netlify](https://app.netlify.com/account/sites)*** and create a new site from your site's repo. We are not really using Netlify to host.

After that, go to **Settings**, and copy your site name. It should be something like `deluxe-lama-123456c`.</br></br>

From the sidebar go to **Domain Management** and add your GitHub Pages domain (`you.github.io`) or your custom domain as a custom Netlify domain. Choose **Yes** when asked if you are the `github.io`’s owner. </br></br>

From the sidebar go to **Access control**, scroll down to **OAuth** and click **Install provider**.</br></br>

Choose **GitHub** as provider, and enter the **Client ID** and **Client Secret** from **GitHub OAuth** app page mentioned above.</br></br>

## 3. Installing the CMS

We are now going to add the CMS files into our static 11ty site.

Under the `root` directory of your site, create a folder named `admin`, and create two files `index.html` and `config.yml`</br></br>

Copy and paste into your `index.html` </br></br>

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Netlify CMS -->
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  </body>
</html>
```
</br></br>
Copy and Paste into your `config.yml` </br></br>

Be sure to replace `you/you.github.io` with your repo, and `deluxe-lama-123456c.netlify.com` with `your-site-name.netlify.com` </br></br>

```
backend:
  name: github
  repo: you/you.github.io
  branch: main
  site_domain: deluxe-lama-123456c.netlify.com

  collections:
      - name: "posts"
        label: "Posts"
        folder: "src/posts"
        create: true
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Description", name: "description", widget: "text" }
          - { label: "Date", name: "date", widget: "datetime" }
```
</br></br>
Save the files, commit, and push to GitHub. Done. Visit ***https://you.github.io/admin*** to see and access your CMS </br></br>
## Additional Resources:
***[Adding NetlifyCMS to existing GitHub Pages](https://cnly.github.io/2018/04/14/just-3-steps-adding-netlify-cms-to-existing-github-pages-site-within-10-minutes.html)***

For more information about the fields field, please go to ***[DecapCMS](https://www.netlifycms.org/docs/add-to-your-site/#collections.)***
