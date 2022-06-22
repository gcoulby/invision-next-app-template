# OAuth Invision Community Signin Component for React

This component provides a sign in button for Invision Community Forums. Users are presented with a button that says 'Sign in with Invision' and when they click the button they are forwarded to Invision to authenticate the React app.

## Pull the repo

Clone this repo into the components folder

```bash
cd <react_project_root>/src/components
git clone https://github.com/gcoulby/invision-auth-react.git
```

## Import the component

Import the component into your project with the following command from the terminal

```js
import { InvisionSignin } from "components/invision-auth-react/invision-auth-react";
```

## Include the component in your project

The component has three exposed properties `community_url`, `client_id`, `scopes`.

| Parameter     | Format                                             |
| ------------- | -------------------------------------------------- |
| community_url | https://example.com (without forward slash on end) |
| client_id     | 429c5cc1a82example5b5074155a7b26                   |
| scopes        | ["profile", "email"]                               |

and are implemented like this:

```js
function App() {
  return (
    <div className="App">
      <InvisionSignin
        community_url="https://example.com"
        client_id="429c5cc1a82example5b5074155a7b26"
        scopes={["profile", "email"]}
      />

[...]
```

## Context Sensitivity

To enable application wide use of the auth data. This component uses the React `useContext` hook. Therefore it is important that your app has a user context for this component to use. To do this, make your `App.js` reflect the following code.

```jsx
function App() {
    const [user, setUser] = useState({
        access_token: "",
        expiry: "",
        user: {},
    });
    return (
        <UserContext.Provider value={{ data: user, updateUser: setUser }}>
            {/* All components that make use of context must go inside here */}
        </UserContext.Provider>
    );
}
```

This will enable you to use the UserContext throughout your application. To use the context variables captured by this component construct your functions like this:

```jsx
import React, { useState } from "react";
function Button() {
    let context = useContext(UserContext);
    return (
        <>
            <button>Hello {context.data.user.name}</button>
        </>
    );
}

export default Button;
```

The context variables available for use in your application are:

| Context Variable | Usage                                                                                                                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| access_token     | The access token used to interact with Invision API                                                                                                                                                                                              |
| expiry           | The expiry date of the access_token                                                                                                                                                                                                              |
| user             | The user data returned from Invision's `api/core/me` endpoint with a valid access_token (See [Invision's REST API Documentation](https://invisioncommunity.com/developers/rest-api?endpoint=core/me/GETindex) for details on the data structure) |

## Session data

Since this component is designed to run in clientside applications, it is not possible to access `SESSION` variables from cookies. Instead this component uses browser localStorage. This ensures that you can navigate away from the page and your 'Session' will remain active so long as your access token has not expired. To ensure that there are no conflicts with other applications on the same domain name, these variables are stored under the following variable name

```js
`invision_credentials(${client_id})`;

//Example:
invision_credentials(skdjahklajgdkag3q4g32);
```

The client ID is setup within Invision's CPanel and should be unique for each application.

## Styling the component

Each element and sub-element in the rendered component can be styled. The following styles can be changed:

| Style                           | Use                                |
| ------------------------------- | ---------------------------------- |
| _.invision_button_              | Outer div for the whole component  |
| _.invision_button_signout_      | the div for the signout button     |
| _.invision_button_photo_        | the photo displayed when signed in |
| _.invision_button_signout_text_ | the text displayed when signed in  |
| _.invision_button_signin_       | the div for the signin button      |
| _.invision_button_icon_         | the icon displayed when signed out |
| _.invision_button_signin_text_  | the text displayed when signed out |

## Auth Flow

The following auth flow is implemented to enable Role Based Access Control (RBAC) on clientside React applications. This OAuth flow demonstrates how client-side applications (e.g. React) should be configured to authenticate users with Invision OAuth authentication.

Frontend pages views can be configured using Role Based Access Control (RBAC). However, the user can edit their clientside data to make themselves e.g. 'Staff lead/Management/Owner'. So you must NEVER server protected content in the frontend without serverside authentication. This example shows how the frontend would pass the invision access token to the backend API, which forwards the access_token to invision, this validates whether the user has access to this content before serving the content to the user.

![https://i.imgur.com/lJEzFML.png](https://i.imgur.com/lJEzFML.png)

> REMEMBER: Never trust the client in client-side apps, anything important should be authenticated server-side before being served to the client.
