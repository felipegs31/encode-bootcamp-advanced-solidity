// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract ArraysLessonTwo {
    uint[] public array;

    constructor(uint[] memory _array) {
        console.log('hello', _array[0]);
        array = _array;
    }

    function deleteItemUnordered(uint index) public {
        array[index] = array[array.length - 1];
        array.pop();
    }

    function deleteItemOrdered(uint index) public {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }

        array.pop();
    }
}
