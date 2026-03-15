---
title: 'EnergyNet Protocol Questions'
date: '2026-03-15T16:22:56-06:00'
description: "Some things I don't understand about EN"
tags: ["energynet"]
#cover:
    #image: ""
draft: true
---
The process of writing software tends to reveal any holes in your understanding of the thing you're implementing. Building
KENETH certainly revealed to me some places I didn't understand [EnergyNet](https://github.com/energyetf/energynet/). A
number of these were purely my own fault, and were resolved by reading the spec more carefully, or understanding the
underlying CBOR format better. But some of them I don't seem to be able to answer on my own, so I thought I'd post them here.
My hope is that I can clarify them for myself, and also in a more public manner for anyone who might come after me.

I should point out that I'm coming at EnergyNet with a purely "software" perspective - I don't have access to any physical
hardware. It's possible that if I was working in a combined environment, some of the answers to these questions would be
obvious. For example, maybe you know if a power transfer is happening by just asking the hardware if a power transfer
is happening! But if that is the case, I think it's worth spelling that out in the spec or some other public documentation.

### Specification Philosophy
My impression is that the software protocol is the coordinator for the overall process, "driving" the hardware
that performs power transfers, based on [Jonas's appearance on the Volts podcast](https://www.volts.wtf/p/making-the-electricity-grid-work).
In particular this part:
> **Jonas Birgersson**
> ... As we said, with software negotiations — because EnergyNet is a very polite language —
> there’s no electrical distribution until first I ask permission: “I would like to send some electricity.”
>
> **David Roberts**
> It’s consent-based.
>
> **Jonas Birgersson**
> Exactly. The first message that was sent over Energy Protocol, by the way, was “Hello, dear,” because it is polite.

So my questions below come from that perspective.

### Transfer Lifecycle
My biggest uncertainties center on the power transfer lifecycle. How do two nodes negotiate a transfer - how exactly
does one "ask permission" and give "consent"?

The [EnergyNet Messages spec](https://github.com/energyetf/energynet/blob/main/entf-ep-messages.md) defines `Supply Parameters`
and `Demand Parameters` messages, which certainly seem relevant. But it doesn't say exactly how they're used - just that
they're "used by a device that provides energy" or "used by a device that wants to make energy transfer demands".

Should we assume that if one side of the connection is sending `Supply Params`, and the other side `Demand Params`, then
they should start a transfer? But what if their requirements (say, voltage min/max) don't match up? Do they automatically
transfer at the lowest level proposed? If so, it would be good to spell out exactly how that's determined.

Also, does that imply that one side could repeatedly send `Demand Parameters`, and the other side just ignore it if they
don't want to supply power?

### Disconnects
Likewise, how does one gracefully stop a power transfer?

There is the `Soft Disconnect` message type, but it's not
clear what the semantics of that are. Is it a disconnect of the power transfer, leaving the data connection intact?
But in that case, how do we gracefully stop the data connection?

The [framing section](https://github.com/energyetf/energynet/blob/main/entf-ep-framing-transport.md)
provides a timeout mechanism - we could shut down a transfer by just not sending messages and letting it timeout,
but that would seem a bit messy and non-deterministic.

### Timeout Semantics
Speaking of timeouts, the spec provides two different timeouts:
> If there is an ongoing energy transfer and there are no messages coming
through at a frequency of at least 5 Hz (every 200ms), the connection should
be considered lost or unstable, dropped...  If there is no ongoing
energy transfer, a device can choose to wait for a longer time before
renegotiating the connection, typically a few seconds.

But how do we know when to switch from the slower time to the faster? This seems like it could well be based on a signal
from the power hardware. But looking purely at the data messages, it seems possible one side could decide a transfer is started
and then timeout before the other side has a chance to respond.

Also, the spec earlier says "EP mandates the transmission of energy coordination messages between 1 and 100 Hz", which
conflicts with the note that a device could wait "a few seconds" between messages, as that would imply sending
messages at less than 1 Hz.

### Thanks!
I want to be clear that I'm not casting aspersions on the spec or the work that went into it, I just want to clarify
this for everyone's benefit.

Also, if I've boneheadedly missed some public documentation on this... well, it wouldn't be the first time! In that case,
I'd be grateful if you could point me in the right direction!
