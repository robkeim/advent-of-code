using Microsoft.VisualStudio.TestTools.UnitTesting;
using AdventOfCode;

namespace AdventOfCodeTests
{
    [TestClass]
    public class Day25Tests
    {
        const string sampleInput = "<puzzle input: download from adventofcode.com>";
        const string myInput = "<puzzle input: download from adventofcode.com>";

        [TestMethod]
        public void Part1()
        {
            Assert.AreEqual(4, Day25.Part1(sampleInput));
            Assert.AreEqual(3, Day25.Part1("<puzzle input: download from adventofcode.com>"));
            Assert.AreEqual(8, Day25.Part1("<puzzle input: download from adventofcode.com>"));
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day25.Part1(myInput));
        }
    }
}
