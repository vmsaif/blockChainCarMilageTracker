/*
 * SPDX-License-Identifier: Apache-2.0
 */

/*eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]*/
/* eslint-disable  no-unused-vars */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');

const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}
