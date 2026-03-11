---
title: 'KENETH Web Demo'
description: 'An initial in-browser demo of KENETH'
tags: ["keneth"]
#cover:
    #image: ""
draft: false
---

So far I've been developing [KENETH](https://github.com/breischl/KENETh) purely with unit tests. Unit tests can get you
a long way, and are essential in many ways, but a demo has a visceral appeal when you can make one. Fortuitously,
Kotlin makes it easy to publish the same code to multiple platforms, including the browser. So I present the
first proof-of-concept [demo of KENETH running in your own browser]({{< ref "demos/keneth/simple_two_node.md" >}}).

Obviously this is purely a software demo - it's just two fake KENETH nodes talking to each other. The network is
simulated with in-memory queues, and the power transfer is not even simulated that much - it's just pure fiction. Still,
this exercises all of the message-passing, serialization, and framing logic in a way that's easier to understand than a
unit test. In fact, it already helped point out a couple of bugs in my implementation! Which is not to say that this
is all working perfectly. I'm sure there are logic bugs, and I'm pretty sure I haven't implemented the EnergyNet spec properly.

In fact, this has highlighted some ambiguities in the spec - or at least things I don't understand about it.
For example, what is the sequence of messages that should initiate a power transfer?
The spec defines some related messages, chiefly `SupplyParameters` and `DemandParameters`, but these
seem to describe status more than indicate a request to send power.

I have other questions about the protocol, but I'll put them out in a future post. For right now, I'm just psyched to have something usable!