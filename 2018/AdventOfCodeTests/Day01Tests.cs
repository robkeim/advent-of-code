using Microsoft.VisualStudio.TestTools.UnitTesting;
using AdventOfCode;

namespace AdventOfCodeTests
{
    [TestClass]
    public class Day01Tests
    {
        const string sampleInput = "<puzzle input: download from adventofcode.com>";
        const string myInput = "<puzzle input: download from adventofcode.com>";

        [TestMethod]
        public void Part1()
        {
            Assert.AreEqual(3, Day01.Part1(sampleInput));
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day01.Part1(myInput));
        }

        [TestMethod]
        public void Part2()
        {
            Assert.AreEqual(2, Day01.Part2(sampleInput));
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day01.Part2(myInput));
        }
    }
}
