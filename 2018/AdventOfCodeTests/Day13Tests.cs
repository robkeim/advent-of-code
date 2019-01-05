using Microsoft.VisualStudio.TestTools.UnitTesting;
using AdventOfCode;

namespace AdventOfCodeTests
{
    [TestClass]
    public class Day13Tests
    {
        const string sampleInput = "<puzzle input: download from adventofcode.com>";
        const string myInput = "<puzzle input: download from adventofcode.com>";

        [TestMethod]
        public void Part1()
        {
            Assert.AreEqual("7,3", Day13.Part1(sampleInput));
            Assert.AreEqual("<puzzle answer: solve on adventofcode.com>", Day13.Part1(myInput));
        }

        [TestMethod]
        public void Part2()
        {
            Assert.AreEqual(-1, Day13.Part2(sampleInput));
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day13.Part2(myInput));
        }
    }
}
