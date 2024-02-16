This is a personal blog starter repository built with Next.js and Reshaped.
Blog design is inpired by brianlovin.com and onur.dev.

> While all code can be forked right now and used for your own blog, I'm planning to publish it as a package and make it possible to only provide the content for the blog, instead of maintaining the whole Next.js application

## Getting started

To use this for your own blog - start by forking and cloning the repository.

Once you have it cloned – install the dependencies.
By default, we're using `yarn` but you can use it with the package manager of your choice.
In the case of using a different package manager – you can delete the original lock file.

```
yarn

npm install

pnpm install
```

Start the project with the `dev` script:

```
yarn dev
```

## Working with the content

- To configure the application – use the `src/config.ts` file, which includes the menu structure and the general settings of the blog.
  You need to manually enter only the top-level menu items, while all submenu items are generated from the markdown file structure.
- All content resides in the `src/posts` folder and files creates in it control the website routing and displayed submenu items. You can create `.mdx` files on the top level or create a subfolder like `/article` to create categories.
- Markdown files support `frontmatter` format, where you can pass the article `title` and `created` date properties, they will be displayed in the articles list and on the article route
- Markdown files support the vanilla markdown features, as well as custom `Bio` component:

```jsx
<Bio
  title="Work"
  items={[
    {
      title: "Reshaped",
      href: "https://reshaped.so",
      label: "Front-end Engineer",
      date: "2020 –",
    },
    {
      title: "Figma",
      href: "https://figma.com",
      label: "Engineering Manager",
      date: "2020 – 22",
    },
    {
      title: "Vercel",
      href: "https://vercel.com",
      label: "Senior Front-end Engineer",
      date: "2018 – 20",
    },
  ]}
/>
```
