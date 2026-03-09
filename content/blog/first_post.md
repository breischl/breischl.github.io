---
title: 'First!'
description: 'First post - also, WTH is KENETH?'
date: 2026-03-07T15:13:11-07:00
tags: [keneth, energynet]
#cover:
    #image: ""
draft: true
---

First post! 

The immediate purpose of this is to support and talk about my side project, KENETH. So let's get right to it!

## What's The Frequency KENETH?
KENETH is an open-source implementation of the EnergyNet Protocol - hence the name, which is short for "Kotlin EnergyNET Hub".

That begs the question, what the heck is EnergyNet? My own very quick, unofficial summary is that it's an attempt to make electric power distribution work more like data networking. So instead of a top-down grid where power flows down from giant generators and money flows up from end users, it's a vision for a decentralized, peer-to-peer energy mesh. The goals and benefits of this include making distributed renewables easier to connect and use, reducing strain on our existing grid (including local distribution and transmission infrastructure) to save us all money, increasing the resilience of the electrical supply by providing a path to localized backup sources (ie, share power with your neighbors), and hopefully unleashing greater innovation in energy.

But if you've got 90 minutes to spare, the best introduction I know of is the [Volts Podcast episode about it](https://www.volts.wtf/p/making-the-electricity-grid-work) - that's also where I first heard of it. You might also check out the [EnergyNet Task Force page](https://www.energynettaskforce.org/). Or, more relevantly for this blog, the [EnergyNet Protocol spec](https://github.com/energyetf/energynet/tree/main).

Implementing that vision is going to require a bunch of power hardware - batteries, connectors, power electronics, and so forth - that I'm not going to do anything about. But it also involves a network coordination layer that allows nodes in this evolving electrical network to talk to each other so they can advertise available energy, coordinate transfers, and even get paid for it - and that kind of communication is something I can help with. When I looked for projects to contribute to, I discovered there was virtually nothing out there - just the aforelinked protocol spec, but no implementations. So I decided to start [KENETH](https://github.com/breischl/KENETh).

## What Am I Hoping To Accomplish?
In the near term, I'd like to make an in-browser simulation of KENETH nodes talking to each other, including logging all the messages between them. My hope is that this demonstrates the concepts and sparks a conversation about how it should work - particularly the sequence of messages for starting a power transfer.

Further out, I'd like to create a production-quality implementation that could be used in the field. This will be a bit challenging since I'm not clear on how interfaces with actual hardware will work, but hopefully that will come.

I'd also like to create some tools to assist in developing further EnergyNet implementations, such as a web-based message debugger - put in hex, get an annotated message out, and vice versa. Possibly a spec compliance test suite at some point.

If somehow this actually takes off, I could see other things to build on top of that like a GUI for managing nodes and visualizing power flows, tracking historical trends, setting prices, forecasting, etc. That's all _very_ speculative, though.

## Cool Story Bro, But Where Are You At Now?
This is still a pre-1.0 release - I don't consider the API stable yet. I _think_ I've got a solid take on the core serialization and networking code... but since I don't have anything to test it against, it's hard to say for sure. I've got a start on some higher-level concepts, but it's still incomplete. Nonetheless, pre-built packages are up on Maven Central already. 

## What Would Help?
It would be super helpful if I could get the attention of a core EnergyNet contributor. I have some questions about how this protocol is intended to work - particularly message sequencing for starting power transfers. Also, I gather they have a demonstration network running, and a larger project in the works, which implies that they have some implementation of this already. It would be great to compare what I've got against that and see what differences there are. Hopefully that could help improve both implementations. Please reach out in the [KENETH Discussion section](https://github.com/breischl/KENETh/discussions)!