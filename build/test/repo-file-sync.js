"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var nock = require("nock");
var mocked_env_1 = require("mocked-env");
// import {Manifest, GitHub} from 'release-please';
// As defined in action.yml
var DEFAULT_INPUTS = {
    token: 'fake-token',
};
var fixturePrs = [
    {
        headBranchName: 'release-please--branches--main',
        baseBranchName: 'main',
        number: 22,
        title: 'chore(master): release 1.0.0',
        body: ':robot: I have created a release *beep* *boop*',
        labels: ['autorelease: pending'],
        files: [],
    },
    {
        headBranchName: 'release-please--branches--main',
        baseBranchName: 'main',
        number: 23,
        title: 'chore(master): release 1.0.0',
        body: ':robot: I have created a release *beep* *boop*',
        labels: ['autorelease: pending'],
        files: [],
    },
];
var sandbox = sinon.createSandbox();
process.env.GITHUB_REPOSITORY = 'fakeOwner/fakeRepo';
function mockInputs(inputs) {
    var envVars = {};
    for (var _i = 0, _a = Object.entries(__assign(__assign({}, DEFAULT_INPUTS), inputs)); _i < _a.length; _i++) {
        var _b = _a[_i], name_1 = _b[0], val = _b[1];
        envVars["INPUT_".concat(name_1.replace(/ /g, '_').toUpperCase())] = val;
    }
    return (0, mocked_env_1.default)(envVars);
}
nock.disableNetConnect();
