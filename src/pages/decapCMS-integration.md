---
layout: layouts/documentation.liquid
permalink: /decapCMS/
eleventyNavigation:
  key: DecapCMS
  parent: Documentation
header_title: DecapCMS Integration
header_subtitle: Setting up DecapCMS with GitHub Pages
---
## Adding DecapCMS to Existing GitHub Pages Site
---
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
Save the files, commit, and push to GitHub. Visit ***https://you.github.io/admin*** to see and access your CMS </br></br>
## Additional Resources:
---
***[Adding NetlifyCMS to existing GitHub Pages](https://cnly.github.io/2018/04/14/just-3-steps-adding-netlify-cms-to-existing-github-pages-site-within-10-minutes.html)***

For more information, please go to ***[DecapCMS](https://www.netlifycms.org/docs/add-to-your-site/#collections.)***
