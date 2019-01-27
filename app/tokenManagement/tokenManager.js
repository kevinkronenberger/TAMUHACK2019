var randtoken = require('rand-token');

tokenManager = {

    currentTokens: [],

    generateToken: function() {

        var uniqueToken = false;
        var tokenCandidate;

        while (!uniqueToken)
        {


            uniqueToken = true; //this will be reset in the for loop if it is proven that the token is not unique
            tokenCandidate = randtoken.generate(16);        

            for (i = 0; i < this.currentTokens.length(); ++i) {

                if (tokenCandidate == currentTokens[i]) {

                    uniqueToken = false;
                    break;

                }

            }

        }

        this.currentTokens.push(tokenCandidate);

        return tokenCandidate;

    },

    getCurrentTokens: function() {

        return this.currentTokens;

    },

}

module.exports = tokenManager;