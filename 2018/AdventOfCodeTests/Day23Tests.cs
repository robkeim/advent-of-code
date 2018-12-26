using Microsoft.VisualStudio.TestTools.UnitTesting;
using AdventOfCode;

namespace AdventOfCodeTests
{
    [TestClass]
    public class Day23Tests
    {
        const string sampleInput = "<puzzle input: download from adventofcode.com>";
        const string myInput = "<puzzle input: download from adventofcode.com>";

        [TestMethod]
        public void Part1()
        {
            Assert.AreEqual(7, Day23.Part1(sampleInput));
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day23.Part1(myInput));
        }

        [TestMethod]
        public void Part2()
        {
            Assert.AreEqual(0, Day23.Part2(sampleInput));
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day23.Part2(myInput));
        }
    }
}
