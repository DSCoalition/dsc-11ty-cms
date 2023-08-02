---
title: Quick Start
layout: layouts/quickstart.liquid
permalink: /quickstart/
eleventyNavigation:
    key: Quick Start
    order: 2
header_title: Quick Start
header_subtitle: Follow these instructions to get started with this template
---

## 1. Clone the project

Navigate into the folder where you would like to host your project and run the following
command to clone:

`git clone https://github.com/kindsys/eleventy-decap-tailwind-template.git`

Move into the new directory using the `cd` command:

`cd eleventy-decap-tailwind-template`

---

## 2. Install Node.js and npm

This template requires Node.js version 14 or higher in order to run. You can check whether you have Node installed by running `node --version`
in the terminal. If the command is not found or the version number is less than 14, you will need to download and install the software. You can
download the latest version of Node.js and npm with the following command:

`npm install -g npm`

---

## 3. Install Eleventy

We can now install the static site generator Eleventy. `@11ty/eleventy` is published on npm, so we can install and save it
to our project's `package.json` using:

`npm install @11ty/eleventy --save-dev`

---

## 4. Run the template

Use the following script to test your installations:

`npm run build:dev`

There should be multiple lines of output, but the last line should look like this if the run is successful:

`[11ty] Wrote 13 files in 0.18 seconds (v2.0.1)`

---

## 5. View the page

Now we can view our page on a local web server by using the `serve` script:

`npm run serve`

Part of your output in the terminal should look like this:

`[11ty] Server at http://localhost:8080/`
