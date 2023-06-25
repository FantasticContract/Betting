# Betting contract witht he commit/reveal protocol

The commit/reveal protocol allows two or more people to arrive at a mutually agreed upon random value using a cryptographic hash function. Let’s take a look at how it works:

1. Side A generates a random number, `randomA`
2. Side A sends a message with the hash of that number, `hash(randomA)`. This commits Side A to the value randomA, because while no one can guess the value of `randomA`, once side A provides it everyone can check that its value is correct.
3. Side B sends a message with another random number, `randomB`
4. Side A reveals the value of `randomA` in a third message
5. Both sides accept that the random number is `randomA ^ randomB`, the exclusive or (XOR) of the two values

```shell
npx hardhat test
npx hardhat run scripts/deploy.js --network mumbai
```
