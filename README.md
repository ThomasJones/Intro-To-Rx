# Intro to RX - A Reactive Programming Primer with ReactiveX

## Reactive Programming
A programming paradigm concerned with programming using asynchronous streams
* Streams of data over time
* Transformable, composable streams
* Automatic propagation of data (observer pattern)

tl;dr A whole new way to think about the flow of data through a program

## RX ReactiveX
http://reactivex.io/

* Collection of open-source libraries for doing reactive programming in almost every language
* Defines common structures and stream operations
* Shares some common ideas with (hopefully) familiar concepts
* Functional array operators (map, filter)
* Promises / Futures (deferred function return value)

## Why RX?
‘Focus on the interdependence of events that define the business logic rather than having to fiddle with a large amount of implementation details.’
* Trivialize asynchronous code
* Propagate and transform data as it changes
* Simplify complex interactions
* Declarative vs. imperative
* Reduce ‘scope’ and potential for side-effects
* Module boundaries as ‘value types’

## RX Components
* Observable - a subject that emits signals that can be subscribed to
* Observer - receiver of signals
* Subscription - a receipt returned when observer subscribes to observable that can be used to unsubscribe from future signals
* Operator - chainable functions that can transform, combine, filter, or manipulate the observable in some way


## More Soon!
