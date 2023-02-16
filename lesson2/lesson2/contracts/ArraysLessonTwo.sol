// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract ArraysLessonTwo {
    uint[] public array;

    constructor(uint[] memory _array) {
        array = _array;
    }

    function deleteItemUnordered(uint index) public {
        if (index >= array.length-1 || index < 0) {
            revert("wrong index");
        }

        array[index] = array[array.length - 1];
        array.pop();
    }

    function deleteItemOrdered(uint index) public {
        if (index >= array.length || index < 0) {
            revert("wrong index");
        }

        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }

        array.pop();
    }
}
