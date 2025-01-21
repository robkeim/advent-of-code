using Microsoft.VisualStudio.TestTools.UnitTesting;
using AdventOfCode;

namespace AdventOfCodeTests
{
    [TestClass]
    public class Day13Tests
    {
        // Use @ for linebreak since \n can get escaped by other \'s in the line
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
            Assert.AreEqual("6,4", Day13.Part2("<puzzle input: download from adventofcode.com>"));
            Assert.AreEqual("<puzzle answer: solve on adventofcode.com>", Day13.Part2(myInput));
        }
    }
}
