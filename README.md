# Chow -  Meal plan management

* Chow is a simple app that help you manage your meal plans to promote healthy living

>**NB:** *The app is till under development*

<h4>When complete it will have the following features</h4>

<ol>
<li> Estimated calory intake per meal</li>
<li> Daily calory intake tracker</li>
<li> Eating reminder (remember, missing meals is bad!)</li>
<li> Meal recommendations based on your goals</li>
<li> Ability to add/edit/delete meals as required</li>
</ol>


### Instructions to upgrade to v17
```
npm install react-scripts@4.0.0 react@17.0.0 react-dom@17.0.0
rm -rf node_modules package-lock.json
npm install webpack@nex
```


### Az Static Web App Notes

* Post login redirect
    * If you want a user to return to a specific page after login, provide a URL in post_login_redirect_uri query string parameter
* Removing user identifying info
    * GET: https://identity.azurestaticapps.net/.auth/purge/<AUTHENTICATION_PROVIDER_NAME>
    * Or https://<WEB_APP_DOMAIN_NAME>/.auth/purge/<AUTHENTICATION_PROVIDER_NAME>




<br/>
<hr/>
Proudly made by <a href="https://peculia.xyz">Peculia IT</a>