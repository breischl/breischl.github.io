---
title: 'EnergyNet Message Decoder'
date: '2026-03-15T09:07:02-06:00'
description: 'A KENETH-based tool to encode/decode EnergyNet Protocol messages'
tags: ["keneth", "energynet"]
#cover:
    #image: ""
draft: false
---
I just posted a new [KENETH](https://github.com/breischl/KENETh)-based tool for EnergyNet - a [message encoder & decoder]({{< ref "demos/keneth/message_debugger.md" >}}). This kind of tool can be pretty
handy when working with binary protocols like EN. This tool is based on the [CBOR.me](https://cbor.me/) diagnostic tool, which
I used when setting up the serialization code for KENETH.

The exact formatting of the tool is a bit idiosyncratic. I wanted to just handle EN _messages_, as that's the more interesting
part to look at. However, the message type is not encoded in the message itself, it's part of the EN frame. So it's not
possible to look at the binary for an EN message and decode it. Well, it may be possible, but it's certainly not easy, nor 
normal for EN parsing, so I didn't deal with it here.

Consequently, the binary panel expects an EnergyNet _frame_ instead. It's a very generic frame with no headers, since we
only need the message type from it. The message type then decodes into the human-readable view as a plain-text header on the
first line - which also lets the tool encode the text back to the EN frame with the type included. So it's a little wonky,
but functional.

Speaking of the text format, that is also idiosyncratic. I would like to make it a more standard format like YAML,
but I didn't want to mess around with that for the first version of the tool. So instead it uses a dead-simple key-value format. 
It's not great, but it's sufficient for the relatively flat structure of EN messages. Hopefully I can improve it in the future.

I would also like to add a binary pretty-printing feature at some point, but for now you can copy the hex from here
and paste it into [CBOR.me](https://cbor.me/) to use their functionality.

I may also look into building some better pretty-printing into the core library, so it could be available for listeners,
logging, and so forth. But I'm still trying to keep the core libraries relatively focused, so it might have to be an optional
sidecar library or something like that.