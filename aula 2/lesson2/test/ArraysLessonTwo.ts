import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ArraysLessonTwo", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployArraysLessonTwoFixture() {
   
    const initialArray = Array.from(Array(10).keys())

    const ArraysLessonTwo = await ethers.getContractFactory("ArraysLessonTwo");
    const arraysLessonTwo = await ArraysLessonTwo.deploy(initialArray);

    return { arraysLessonTwo };
  }

  describe("Deployment", function () {
    it("Should set the initial array", async function () {
      const { arraysLessonTwo } = await loadFixture(deployArraysLessonTwoFixture);

      expect(await arraysLessonTwo.array(0)).to.equal(0);
      expect(await arraysLessonTwo.array(9)).to.equal(9);
      
      const bytes32Length = await ethers.provider.getStorageAt(arraysLessonTwo.address, 0)
      const length = parseInt(bytes32Length, 16)
      expect(length).to.equal(10);
    });

  });

  describe("deleteItemUnordered", function () {
    it("Should remove items from array", async function () {
      const { arraysLessonTwo } = await loadFixture(deployArraysLessonTwoFixture);

      expect(await arraysLessonTwo.deleteItemUnordered(5))

      let finalArray = []
      for(let i = 0; i < 9; i++) {
        const value = await arraysLessonTwo.array(i)
        finalArray.push(value.toNumber())
      }

      // check that the 5 is gone
      expect(finalArray.filter(arr => arr === 5).length).to.equal(0)
      
      let bytes32Length = await ethers.provider.getStorageAt(arraysLessonTwo.address, 0)
      let length = parseInt(bytes32Length, 16)
      expect(length).to.equal(9);

      expect(await arraysLessonTwo.deleteItemUnordered(3))

      finalArray = []
      for(let i = 0; i < 8; i++) {
        const value = await arraysLessonTwo.array(i)
        finalArray.push(value.toNumber())
      }

       // check that the 3 is gone
       expect(finalArray.filter(arr => arr === 3).length).to.equal(0)

      bytes32Length = await ethers.provider.getStorageAt(arraysLessonTwo.address, 0)
      length = parseInt(bytes32Length, 16)
       expect(length).to.equal(8);

    });

  });

  describe("deleteItemOrdered", function () {
    it("Should remove items from array", async function () {
      const { arraysLessonTwo } = await loadFixture(deployArraysLessonTwoFixture);

      expect(await arraysLessonTwo.deleteItemOrdered(5))

      for(let i = 0; i < 9; i++) {
        let j = i < 5 ? i : i+1
        expect(await arraysLessonTwo.array(i)).to.equal(j);
      }
      
      let bytes32Length = await ethers.provider.getStorageAt(arraysLessonTwo.address, 0)
      let length = parseInt(bytes32Length, 16)
      expect(length).to.equal(9);

      // delete position 3
      expect(await arraysLessonTwo.deleteItemOrdered(3))

      for(let i = 0; i < 8; i++) {
        let j = i < 3 ? i : i < 4 ? i+1 : i+2

        expect(await arraysLessonTwo.array(i)).to.equal(j);
      }
      
      bytes32Length = await ethers.provider.getStorageAt(arraysLessonTwo.address, 0)
      length = parseInt(bytes32Length, 16)
      expect(length).to.equal(8);

    });

  });

});
