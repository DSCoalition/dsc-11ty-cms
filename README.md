# Digital Services Coalition

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Development](#development)
  - [Content Management](#content-management)
  - [Production Build](#production-build)
- [License](#license)


## Features

- **Eleventy**: A static site generator that allows you to create dynamic and flexible static websites using various templating languages.
- **Tailwind CSS**: A highly customizable CSS framework that simplifies designing responsive and visually appealing user interfaces.
- **Decap CMS**: An intuitive content management system that enables non-technical users to manage website content seamlessly.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/kindsys/dsc-11ty-cms.git
   ```
2. Navigate to the project directory:

   ```
   cd dsc-11ty-cms
   ```
3. Install the project dependencies:

   ```
   npm install
   ```
### Configuration

#### Eleventy Configuration:
- Open the `eleventy.js` file and configure template engines, I/O directories, collections, filters, shortcodes, and more.

#### Decap CMS Configuration:
- Open the `admin/config.yml` file and configure settings such as the content directory, collections, and more.

## Usage

### Development

To start the development server and build your Eleventy project with Tailwind CSS, run:

 ```
 npm run serve
 ```

 It first runs the "clean" command to remove the _site directory. Then, it runs the commands that start local development servers using webpack and  Eleventy concurrently.


### Content Management

To access the CMS open your web browser and navigate to `http://localhost:8080/admin` to access the Decap CMS interface. Here, you can manage your website's content.


### Production Build

When you're ready to deploy, build the site for production:

 ```
 npm run build:prod
 ```

Starts by cleaning the _site directory, then generates optimized assets using webpack, and finally generates optimized static HTML files using Eleventy with production-specific settings.


