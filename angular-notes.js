/* A module contains the different components of an AngularJS app.

The ng-app is called a directive. It tells AngularJS that the myApp module will live within the <body> element, termed the application's scope. In other words, we used the ng-app directive to define the application scope.

A controller manages the app's data.

Like ng-app, ng-controller is a directive that defines the controller scope.

This is called an expression. Expressions are used to display values on the page.

A module contains the different components of an AngularJS app

A controller manages the app's data

An expression displays values on the page

A filter formats the value of an expression

Like ng-app and ng-controller, the ng-repeat is a directive. It loops through an array and displays each element.

Directives bind behavior to HTML elements. When the app runs, AngularJS walks through each HTML element looking for directives. When it finds one, AngularJS triggers that behavior (like attaching a scope or looping through an array).

The ng-click is a directive. When <p class="likes"> is clicked, ng-click tells AngularJS to run the plusOne() function in the controller.

The plusOne() function gets the index of the product that was clicked, and then adds one to that product's likes property.

Notice that the plusOne() doesn't interact with the view at all; it just updates the controller. Any change made to the controller shows up in the view.

A user visits the AngularJS app.

The view presents the app's data through the use of expressions, filters, and directives. Directives bind new behavior HTML elements.

A user clicks an element in the view. If the element has a directive, AngularJS runs the function.

The function in the controller updates the state of the data.

The view automatically changes and displays the updated data. The page doesn't need to reload at any point.

We can use Angular's built-in directives together with custom directives to create more readable apps.

Directives are a powerful way to create self-contained, interactive components. Unlike jQuery which adds interactivity as a layer on top of HTML, AngularJS treats interactivity as a native component of HTML. */

app.directive("appInfo", function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/directives/appInfo.html'
  };
});

/* We wrote code to teach the browser a new HTML element <app-info>, and used it in the view to display each app's details.

First in js/directives/appInfo.js, we made a new directive. We used app.directive to create a new directive named 'appInfo'. It returns an object with three options:

• restrict specifies how the directive will be used in the view. The 'E' means it will be used as a new HTML element.
• scope specifies that we will pass information into this directive through an attribute named info. The = tells the directive to look for an attribute named info in the <app-info> element, like this: */

 <app-info info="shutterbugg"></app-info>

/* The data in info becomes available to use in the template given by templateURL.

• templateUrl specifies the HTML to use in order to display the data in scope.info. Here we use the HTML in js/directives/appInfo.html.

Looking at js/directives/appInfo.html, we define the HTML to display details about an app, like its title and price. We use expressions and filters to display the data.

Then in index.html we use the new directive as the HTML element <app-info>. We pass in objects from the controller's scope ($scope.shutterbugg) into the <app-info> element's info attribute so that it displays.

Why is creating your own directives useful?

Readability. Directives let you write expressive HTML. Looking at index.html you can understand the app's behavior just by reading the HTML.

Reusability. Directives let you create self-contained units of functionality. We could easily plug in this directive into another AngularJS app and avoid writing a lot of repetitive HTML.

Directives are a core feature of AngularJS. So far we've used custom directives to simply display static content, but they can do more than this. It's possible to bake interactivity into directives.

Let's start creating another directive that reacts to a user's click. */

app.directive("installApp", function() {
  return {
    restrict: 'E',
    scope: '',
    link: function(scope, element, attrs) { 
      scope.buttonText = "Install", 
      scope.installed = false, 

      scope.download = function() { 
        element.toggleClass('btn-active'); 
        if(scope.installed) { 
          scope.buttonText = "Install"; 
          scope.installed = false; 
        } else { 
          scope.buttonText = "Uninstall"; 
          scope.installed = true; 
        } 
      } 
    },
    templateUrl: 'js/directives/appInfo.html'
  };
});

/* We used app.directive to create a new directive named 'installApp'.

The directive contains the three options restrict, scope, and templateUrl that we saw before in the 'appInfo' directive.

It also contains a fourth option link. The link is used to create interactive directives that respond to user actions.
The link function takes three inputs:

• scope refers to the directive's scope. Any new properties attached to $scope will become available to use in the directive's template.
• element refers to the directive's HTML element.
• attrs contains the element's attributes.

Inside the link function, there are two properties buttonText and installed, and the function download(). We'll use these in the directive's template next.

Next, write the directive's template:

In the new file js/directives/installApp.html. Type in the following HTML: */

<button class="btn btn-active" ng-click="download()"> 
  {{ buttonText }} 
</button>

/* The template uses Angular's built-in ng-click directive. When the button is clicked, ng-click will tell AngularJS to run the download() function in the directive.

The download() function uses the scope.installed property to check if an app is installed. When an app is installed, download() does three things:

• toggles the .btn-active class
• changes the button text to "Uninstall"
• changes scope.installed to true

Finally, use the new directive in the view:

In index.html, add the new <install-app> element inside the .card div under the <app-info> element.

So far we've made AngularJS apps by adding data to a controller, and then displaying it in a view.

But what happens when the data contains hundreds of items, or if it's constantly changing like weather or financial data? Hardcoding data into a controller won't work anymore.

A better solution is to read the live data from a server. We can do this by creating a service.

In the browser frame on the right, visit https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json. It's a JSON object containing a city_name and an array days containing weather data for the next five days.

Create a service named forecast that fetches the weather data from the server. In the new file js/services/forecast.js. Type in this code exactly as you see here: */

app.factory('forecast', ['$http', function($http) { 
  return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
  .success(function(data) { 
    return data; 
  }) 
  .error(function(err) { 
    return err; 
  }); 
}]);

/* In the controller, modify MainController by passing in the forecast service, like this: */

app.controller('MainController', ['$scope', 'forecast', function($scope, forecast) {
  forecast.success(function(data) {
    $scope.fiveDay = data;
  });
}]);

/* in js/services/forecast.js, we made a new service. We used app.factory to create a new service named forecast
The forecast service needs to use AngularJS's built-in $http to fetch JSON from the server. Therefore, we add $http to the forecast service as a dependency, like this: */

 ['$http', function($http) {
   // ...
 }]

/* Now $http is available to use inside forecast.

Then, inside forecast, we use $http to construct an HTTP GET request for the weather data. If the request succeeds, the weather data is returned; otherwise the error info is returned.

Next in the controller, we used the forecast service to fetch data from the server. First we added forecast into MainController as a dependency so that it's available to use. Then within the controller we used forecast to asynchronously fetch the weather data from the server and store it into $scope.fiveDay

As before, any properties attached to $scope become available to use in the view. This means in index.html, we can display the city_name using an expression as done before. */

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'HomeController',
    templateUrl: 'views/home.html'
  })
  .when('/photos/:id', {
    controller: 'PhotoController',
    templateUrl: 'views/photo.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});

/* In app.js inside the app.config() method, we use Angular's $routeProvider to define the application routes.

We used .when() to map the URL / to to the controller HomeController and the template home.html. The HomeController uses the service js/services/photos.js to fetch the array of all photos from https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json and stores it into $scope.photos. The home.html uses ng-repeat to loop through each item in the photos array and display each photo.

Otherwise if a user accidentally visits a URL other than /, we just redirect to / using .otherwise().

Now when a user visits /, a view will be constructed by injecting home.html into the <div ng-view></div> in index.html.

In app.js, we mapped a URL to PhotoController and photo.html. We added a variable part named id to the URL, like this: /photos/:id.

In PhotoController, we used Angular's $routeParams to retrieve id from the URL by using $routeParams.id. Notice that we injected both $routeParams and the photos service into the PhotoController dependency array to make them available to use inside the controller.

Then to fetch an individual photo, we first used the photos service to fetch the array of photos from the server, and then used $routeParams.id to access the specific photo by its index.

As before, any properties attached to $scope become available to use in the view. This means in photo.html, we can display the photo's detail using expressions as done before.

Notice that when you click on links, the app doesn't do a full reload. Only the part of the view specified by <div ng-view></div> changes.

Instead of filling a single view with more code than needed, routes let us map URLs to self-contained controllers and templates. Furthermore, now that the app has URLs, users can easily bookmark and share the app's pages.

Directives are a way to make standalone UI components, like <app-info>

Services are a way to make standalone communication logic, like forecast which fetches weather data from a server

Routes are a way to manage apps containing more views.