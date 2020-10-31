# Ballicure (CRUD Demo) 

> BalliCure is a website that corrects rejected ballot signatures.

Vote-by-mail is now a critical electoral institution. Urgency to implement systems state-by-state is increasing as the 2020 election gets closer.

However, there are genuine concerns. Vote-by-mail introduces a complex ecosystem where EVERY state has get EVERY part right. There is some cause for concern. A couple of requirements for a fair vote-by-mail election:
* Resilient postal service
* Verifiable vote counting
* Accessible vote tracking
* Quick ballot curing (Process of correcting ballots with mistakes)
    * When a mail-in-vote's ballot is rejected, election offices have to inform and receive a cure with the voter through mail. That could take weeks!
    * A half of a million ballots were rejected in 2020's primaries.

BalliCure is a minimal website that cures signatures. A well oiled cog in a larger ballot curing system.

Voters receive a text message that guides them to cure their ballot online.
* Fixes rejected signatures in minutes versus weeks.
* Add ballots to through a dead simple REST API. (Not implemented) 
* Doesn't store identities and vote choices, safe to expose to the internet.

### Running Ballicure

First download Ballicure.
``git clone https://github.com/mooshoe/ballicure.git``

Running in production:
``npm start``

Development:
``DEBUG=curing:* npm run develop``
