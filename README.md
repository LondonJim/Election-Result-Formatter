# Election results based on Guardian Tech Test

I have a feed of election results from a data supplier. They will supply a file which will be updated throughout the night as results come in.

## Installation

`npm install`

Execute the node repl:

`node`

Enter the following to read the results text file and display all results (currently console.log):

`.load returnresult.js`

`election = new ReturnResult()`

`election.readResults()`

Example return:

```
Cardiff West
------------
Conservative Party 30.8%
Labour Party 49.7%
UKIP 13.7%
Liberal Democrats 5.8%

Islington South & Finsbury
--------------------------
Labour Party 51.5%
Conservative Party 21.4%
Liberal Democrats 11%
UKIP 7.7%
Green Party 7.7%
Independent 0.7%

Norbury
-------
Labour Party 55.9%
Conservative Party 37.5%
Green Party 1.7%
Liberal Democrats 4.9%

Complete.
```

Return all results in correct order with percentages in key value array format

`election.results`

Return particular constituency in key value array

`election.results["Cardiff West"]`


## Testing

Mocha

`npm run test`

### Results format

The fields in the file will be separated by commas but each row will vary in length as described below.

A result will consist of:

1. A constituency
2. A repeating set of pairs with the party code and the votes cast

So for example:

    Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069, LD
    Islington South & Finsbury, 22547, L, 9389, C, 4829, LD, 3375, UKIP, 3371, G, 309, Ind

We want to transform this into a standard result that shows:

* the constituency name
* translates the party code into a full name
* shows the share of the vote as a percentage of all the votes cast

### Codes

* C - Conservative Party
* L - Labour Party
* UKIP - UKIP
* LD - Liberal Democrats
* G - Green Party
* Ind - Independent
* SNP - SNP

### Validation (still to implement)

If there is a problem with the format of the results file then all good entries should result in output and the error should go to a separate error log with the problem explained in non-technical language that a journalist might be able to understand and report back to the results service.
