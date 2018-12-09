using Microsoft.VisualStudio.TestTools.UnitTesting;
using AdventOfCode;

namespace AdventOfCodeTests
{
    [TestClass]
    public class Day09Tests
    {
        const string sampleInput = "<puzzle input: download from adventofcode.com>";
        const string myInput = "<puzzle input: download from adventofcode.com>";

        [TestMethod]
        public void Part1()
        {
            Assert.AreEqual(32, Day09.Part1(sampleInput));
            // Additional samples
            Assert.AreEqual(8317, Day09.Part1("<puzzle input: download from adventofcode.com>"));
            Assert.AreEqual(146373, Day09.Part1("<puzzle input: download from adventofcode.com>"));
            Assert.AreEqual(2764, Day09.Part1("<puzzle input: download from adventofcode.com>"));
            Assert.AreEqual(54718, Day09.Part1("<puzzle input: download from adventofcode.com>"));
            Assert.AreEqual(37305, Day09.Part1("<puzzle input: download from adventofcode.com>"));
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day09.Part1(myInput));
        }

        [TestMethod]
        public void Part2()
        {
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day09.Part2("<puzzle input: download from adventofcode.com>"));
        }
    }
}
