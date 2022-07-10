# React Starter :rocket:

### Pop the kettle on, all the boilerplate is sorted! :coffee:

A React starter repo with the aim to implement "scalable gold star" standards from the get go giving some examples with a couple of screens.

## Intro / Motivation

This hopefully exists as a _"living document"_ in the sense that as popular patterns change and packages update, this starter app will also update.

To be honest it exists to fill that gap when you want to start a new side project / hobby project where you have that cracking idea but you say: **"I really can't be bothered setting everything up and putting boilerplate in... "**

## Getting Started

Unlike the React Native starter kit (see [here](https://github.com/kepop1/react-native-starter-ts)) with this being a React Web App there's no extra boilerplate other than having npm/yarn installed. It's built on top of Create React App (CRA) and you can find more here: https://create-react-app.dev/

## Outline

This starter will setup you up with a project has:

1. Structure/Architecture with Prettier and ESLint and TSConfig
2. React (from TypeScript Template.)
3. React Context
4. React Router Dom
5. Axios
6. React Hook Form
7. Basic pages / Navigation
8. TypeScript (Nothing too scary)
9. TypeScript Jest & React Testing Library

In the future maybe? :thinking:

- Detox/Appium (E2E tests)
- Fastlane?
- Analytics?
- Crashes? Sentry?
- Deeplinks?
- Firebase? Push Notifications?
- React-Query / More complex opinionated state management.
- PWA?

## Reccomended VS Code Extensions

> These are the ones that I've found help with the dev workflow - you might equally find them not so helpful.

- Auto Close Tag _(Essential)_
- Auto Rename Tag _(Essential)_
- Babel JavaScript _(Essential)_
- ESLint _(Essential)_
- Prettier _(Essential)_
- Code Spell Checker _(Handy)_
- Color Highlight _(Handy)_
- Partial Diff _(Handy allows selection of text CTRL+C and then right click on another selection to - get a git like compare view)_
- Path Intellisense _(Handy)_
- Rainbow Brackets _(Depends on how much you like colours - but it's quicker nested function identification)_
- vscode-icons _(VSCode's icons have come along way but these are still a litle better)_
- Sass _(Handy for styling)_
- Scss IntelliSense _(Handy for styling)_
- CSS Modules _(Handy for styling)_
- GitLens _(This can be a bit resource intensive)_

## Lets address the React elephants in the room :elephant:

- We're not using NextJS / RemixJS - this is because these are big frameworks for use cases where static site rendering / generation is important. This starter kit assumes you're only going to need single page web app, it is worth thinking about how much you REALLY need SSR for what is a web app at a single domain.
  - It'll bring a lot of overhead when developing new screens / using state and how they'll work in the lifecycle of the client bundle and when they've been rendered through SSR.
    - There's even complexities when dealing with styling.
- There is a TON of documentation discussing frameworks, so I'll cut this section short, but it's some food for thought.

## Let's address the CSS-in-JS elephant in the room :nail_care:

- Preface: I agree that styled-components and the various litter of other libraries have a `nicer` dev experience to a degree.
- They're not included here because they're not necessary, the website is faster just using CSS and a smaller bundle size, using CSS modules means we have the benefit of scoped class names based on the component easy enough.
  - We can even import our theme files we use in scss into our js files thanks to the sass-loader in the create-react-app base!
- Everyone is familiar with CSS + CSS workarounds, where as CSS-in-JS libraries have their own perculiarities and just move issues elsewhere, for example we shun `!important` yet styled-components just has a different implementation: https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
- There's an argument on markup being more verbose based on the styled component reading as what it is... but there's not much difference at a glance ...
  - `<MyContainer />` vs `<div className={styles.myContainer}>` ...
- CSS-in-JS abstracts away the semantic benefit of HTML, e.g. we don't know if a `<MyListItem>` is an `li` or `ol` or `span` or just mapped `div` elements.
  - Or is `<Container>` a `div`, `aside`, `article`, `section` ?
  - It'd be mentally taxing and pretty ugly if we were to start doing `<MyListItemLi>` or `ContainerAside` ...
- CSS-in-JS packages tend to bring in dependency issues, they're doing a lot under the hood and are relying on a lot of packages, and there can be issues in niche cases.
- Keeping styles with where a component is defined only works for small components, as soon as they're complex you'd abstract the styles into `styles.tsx` file anyway. Why not a css file from the start?
- There's a lot of comparisons out there and if the marginally better developer experience is that crucial then it won't be a big job to bring a css-in-js library in.
  - Some articles I found interesting: https://gist.github.com/stowball/c077da6828405eeeb3c013f0e23b2029, https://dev.to/fyapy/sass-vs-css-modules-vs-css-in-js-vs-compile-time-css-in-js-who-wins-4cl
- It's mindblowing that these libraries have the ability to introduce JavaScript / TypeScript errors in CSS. JS issues in CSS! What?! :angry:
  - We won't even talk about the mess of introducing TypeScript to type the CSS-in-JS styles ...

## Assumptions

- You enjoy single line quotes, no semi-colon enforcement and pretty much all the auto-formatting from Prettier out of the box.
- You agree with the current ESLint ruling for both React / React Hooks / TypeScript
- You're ok with having a font added by default, as it can be a quirk to setup and it'll show you where it needs to go.
- You're ok with TypeScript / React Hook Form -> These are probably the most opinionated parts. TS is in here for a laundry list of reasons.
  - React Hook Form however is a lighter alternative to Formik which is kinda heavy - but has it's own downsides, this at the least makes it functional for basic forms.
- You're ok with ts-jest for TypeScript backed testing, and react-testing-library for rendering the components for tests.
  - The tests here are also focused on the behaviour of the components as opposed to strictly checking data / display rendering.
- To be honest I probably wouldn't be bothered about putting screens inside of a `pages/` folder however Next and other frameworks have popularised this to the point where it feels 'weird' to not have a folder for it.
  - Similarly `loggedIn/` and `loggedOut/` folders are just a method of keeping a mental map of what pages relate to what section of the web app. Easy enough to just not do that if you disagree!
- You're ok with a CSS reset being done by Normalize.css. There's probably more aggressive resets, but that's not my decision to enforce. A lot of frameworks will use Normalize by default.
- You're ok having the font-size set to a percentage based on the browsers default and then we user rem throughout for our sizing. E.g. 62.5% is 10px, therefore 1 rem = 10px. This just makes life easier.
  - There's often times where you would have a margin that's 1.5 x the core unit of padding. Why on earth do you want to mentally workout 1.5 x 16. 1.5 \* 10 = 15px. Easy.
  - Interesting article on rems / accessibility found while making this starter kit: https://medium.com/hackernoon/rems-and-ems-and-why-you-probably-dont-need-them-664b9ce1e09f
- You're ok with SASS and CSS modules.
  - CSS Modules is just auto generated BEM so we don't have to mentally look after those class names.
  - CSS Module native variables and modules aren't particularly easy to setup / SASS variables are compiled so we get values in the css build output which is faster.
