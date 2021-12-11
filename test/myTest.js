const assert = require("assert");
const Election = artifacts.require("Election");

contract("Election contract baby", async (accounts) => {
  let instance;
  before(async function () {
    instance = await Election.new();
  });

  it("checking two candidate present", async () => {
    let co = await instance.candidateCount();
    assert(co, 2);
  });
  it("checking initial vote is zero", async () => {
    let v1 = await instance.candidates(1);
    let v2 = await instance.candidates(2);
    console.log(v1, v2);
    assert(v1[2], 0);
    assert(v2[2], 0);
  });
  it("checking candidate name", async () => {
    let v1 = await instance.candidates(1);
    let v2 = await instance.candidates(2);
    assert(v1[1], "Candidate 1");
    assert(v2[1], "Candidate 2");
  });
});
