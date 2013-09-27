# FlowTie.com

You have a growing small business with a lot of deliveries.

This app connections your shipments to an optimize route reccomendation engine.

## Deployed Version
* [Not done yet](http://www.flowby.net) (Amazon Web Services)

## Screen Shots
![[app]](screenshots/app.png)

## Tech Stack
* [Mean.IO](https://github.com/linnovate/mean)

## Additional Packages
* [Google Maps TSP Solver](https://code.google.com/p/google-maps-tsp-solver/)
* [Clusterfck](https://github.com/harthur/clusterfck)
* [ng-grid](http://angular-ui.github.io/ng-grid/)

## Codebase Map
* most of my development was on the client side.

### Client Side
* the workflow of the app is driven by the 'drivers' section in the top left corner.
* when the number of drivers changes, the event is broadcasted to the other controllers via an Angular service.
* the routes controller displays only the selected drivers and their associated shipments and routes.
* the map will display a route corresponding to each selected drivers.

### Server Side
* the main server side file I'm using is the shipments controller which sends back the shipments with information of which cluster they belong in.  On the Client side I assign the cluster to an available driver.

## Technical Challenges

* **Promises**: were working ok for a single run but not when used repeatedly in a loop.  I returned to using nested callbacks.
* **External Libraries**: I started using some Angular directives I found online but in the end I found that they didn't have all the functionality I needed.
* **Clustering algorithms**: I didn't know anything about this area so I did some research on the various algorithms available.
 
## More Information

  * Contact Doug Kong on any issue via [E-Mail](mailto:kongdouglas@gmail.com), or [Twitter](http://www.twitter.com/dougkong).
