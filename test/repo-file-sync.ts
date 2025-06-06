import {describe, it, beforeEach, afterEach} from 'mocha';
import * as action from '../src/index';
import * as assert from 'assert';
import * as core from '@actions/core';
import * as sinon from 'sinon';
import * as nock from 'nock';
import {RestoreFn} from 'mocked-env';
import mockedEnv from 'mocked-env';

import {Manifest, GitHub} from 'release-please';
// As defined in action.yml

const DEFAULT_INPUTS: Record<string, string> = {
  token: 'fake-token',
};

const fixturePrs = [
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

const sandbox = sinon.createSandbox();
process.env.GITHUB_REPOSITORY = 'fakeOwner/fakeRepo';

function mockInputs(inputs: Record<string, string>): RestoreFn {
  const envVars: Record<string, string> = {};
  for (const [name, val] of Object.entries({...DEFAULT_INPUTS, ...inputs})) {
    envVars[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = val;
  }
  return mockedEnv(envVars);
}

nock.disableNetConnect();
