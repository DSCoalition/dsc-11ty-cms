---
layout: layouts/documentation.njk
permalink: /deployment/
eleventyNavigation:
  key: Deployment
  parent: Documentation
header_title: Deployment with GitHub Actions & GitHub Pages
header_subtitle: Set up a CICD pipeline for your 11ty, DecapCMS, and TailwindCSS template
---

## Setting up GitHub Pages
---
 1. Now that your repository is created, we can enable GitHub Pages. Go to the page of the repository you've just created and click on the **Settings** button on the top right. </br></br>

 2. Click on the **Pages** button on the sidebar menu and select your default branch in the dropdown, this is probably `main` or `master`, leave `/(root)` as the selected folder. Click on **save** .</br></br>

## Build your website with GitHub Actions
---
1. By default, GitHub pages uses Jekyll to generate websites. In our case, we're using 11ty, so we want to inform GitHub Pages.
To do so, create an empty file called `.nojekyll` and put it in the root directory. </br></br>

2. Create `.github` folder in the `root` directory, and inside that folder, create another folder called `workflows` . In this folder, we put the workflows which GitHub Actions execute. </br></br>

3. We're going to create two workflows: </br></br>
Create a file with the name  `build.yml`  </br></br>
This workflow performs a build when a pull request is created.
If your default branch is something other than `main` make sure to change this in the `branches` array. </br>
This workflow only performs a build and doesn't deploy your changes.</br></br>

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
This workflow builds and deploys our website to GitHub Pages when a push is done on the ```main``` branch, for example merging a pull request. </br></br>

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

5. Now head over to your repository on GitHub and click on the **Actions** tab. You should see the `Build & Deploy` workflow being executed, once that is done another workflow called `pages-build-deployment` is triggered and deploys the generated website to GitHub Pages.</br></br>

6. After the `Build & Deploy` workflow is executed a new branch called `gh-pages` is auto-created. In this branch the generated output of your 11ty site will be stored. To be able to host the website properly we need to inform GitHub Pages about this.</br> Navigate to the **Settings** tab and select **Pages** in the list on the left. Change the branch from which your GitHub Pages site is currently being built to `gh-pages` and `root` and hit **save**.</br></br>

7. The ```pages-build-deployment``` workflow will be automatically triggered again and after it has finished you can navigate to the URL where your website is published to see the final result.</br></br>

## Additional Resources:
---
***[How to Deploy your Eleventy Website to GitHub Pages with GitHub Actions](https://maarten.be/blog/20220730/how-to-deploy-your-eleventy-website-to-github-pages-with-github-actions/)*** </br></br>

***[Actions with GitHub Pages](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-create-ssh-deploy-key)***




