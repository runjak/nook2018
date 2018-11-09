---
title: Intro to GraphQL - MetaNook 2018
separator: ---
verticalSeparator: -v-
revealOptions:
    transition: 'slide'
---

# Intro to GraphQL

<img src="./images/gql-logo.svg" style="width: 400px; border: none;" />

[@sicarius](https://twitter.com/sicarius) 🚀 https://github.com/runjak/nook2018 🎉

---

## Overview

* Opening slide, overview and history
* Desired features
* Query by example
* The GraphQL Schema
* Query complexity
* Caching
* Code and interaction and things

---

## A short history of GraphQL

* Facebook started development on GraphQL in 2012.
* GraphQL was released publicly in [2015](https://code.fb.com/core-data/graphql-a-data-query-language/).
* GraphQL is now developed by a community, see [graphql.org](https://graphql.org/).
* 2018-11-07: [GraphQL Foundation](https://sdtimes.com/api/the-linux-foundation-announces-plans-to-form-graphql-foundation/)

---

# Desired features

-v-

## Desired features: communication

* We desire low communication overhead
  * fewer requests
  * smaller requests
* We achieve this by:
  * specializing requests
  * batching several requests together
  * moving query complexity to the server

-v-

## Integrity

* We desire correctness of data in transit
  * correctness of handling at server- and client-side
* We achieve this by:
  * Having the server publish a schema that the client can discover
  * validating all data transferred in either direction against a schema

-v-

## Ease of use

* We desire the API to be easy to use
  * abillity to discover
  * simple to write queries
* We achieve this by:
  * Using the schema to provide documentation and auto-completion for the API
  * something similar to query by example (IBM Research 197*)

---

## Query Playground

<img src="./images/queryComposition.png" style="border: none" />

-v-

## Query Playground

Let's visit:
https://graphql.org/swapi-graphql/

---

# The schema

-v-

## Scalar types

* `Int`: Signed 32-bit integer
* `Float`: Signed double-precision floating point
* `Boolean`: true or false
* `ID`: Unique identifiers, serialized like a string

-v-

## Enums

```graphql
enum Protocol {
  HTTP
  SMTP
  NTP
}
```

-v-

## Nested structures

`Objects, Inputs, Lists, Non-Null`

```graphql
type Foo {
  count: Int!
  bars: [Bar!]!
}

input Bar {
  name: String!
}
```

-v-

## Definition

```graphql
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
```

* Must have: `query`
* May have: `mutation`, `subscription`

---

## Query complexity

Consider this setup:

<img src="./images/complexityComposition.png" style="border: none; width: 700px;" />

---

## Caching

* What data is best to cache?
* Where can caching be done?
* Use of case specific connections depending on caching case

---

## Before the code

* Anyone without a Computer but desires to code?
  * Maybe team up?
* If you haven't already clone https://github.com/runjak/nook2018
  * Run `npm install` or `yarn install`
* Let's figure this stuff out!

---

## Toying with the code

* We should see some stuff now!

---

## After the code

* Is there time for annecdotes?
* Questions? Ask away if you havn't!

-v-

## After the code

* Thanks for having me
* I hope you had fun
* Explore all the API features