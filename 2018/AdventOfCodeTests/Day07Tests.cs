using Microsoft.VisualStudio.TestTools.UnitTesting;
using AdventOfCode;

namespace AdventOfCodeTests
{
    [TestClass]
    public class Day07Tests
    {
        const string sampleInput = "<puzzle input: download from adventofcode.com>";
        const string myInput = "<puzzle input: download from adventofcode.com>";

        [TestMethod]
        public void Part1()
        {
            Assert.AreEqual("CABDFE", Day07.Part1(sampleInput));
            Assert.AreEqual("<puzzle answer: solve on adventofcode.com>", Day07.Part1(myInput));
        }

        [TestMethod]
        public void Part2()
        {
            Assert.AreEqual(-1, Day07.Part2(sampleInput));
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day07.Part2(myInput));
        }
    }
}
