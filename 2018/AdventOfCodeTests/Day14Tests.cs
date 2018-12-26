using Microsoft.VisualStudio.TestTools.UnitTesting;
using AdventOfCode;

namespace AdventOfCodeTests
{
    [TestClass]
    public class Day14Tests
    {
        const int sampleInput = 9;
        const int myInput = 306281;

        // This test takes a couple of minutes to run
        //[TestMethod]
        public void Part1()
        {
            Assert.AreEqual("5158916779", Day14.Part1(sampleInput));
            Assert.AreEqual("0124515891", Day14.Part1(0 /* <puzzle input: download from adventofcode.com> */));
            Assert.AreEqual("9251071085", Day14.Part1(0 /* <puzzle input: download from adventofcode.com> */));
            Assert.AreEqual("5941429882", Day14.Part1(0 /* <puzzle input: download from adventofcode.com> */));
            Assert.AreEqual("<puzzle answer: solve on adventofcode.com>", Day14.Part1(myInput));
        }

        [TestMethod]
        public void Part2()
        {
            Assert.AreEqual(0, Day14.Part2(sampleInput));
            Assert.AreEqual(0 /* <puzzle answer: solve on adventofcode.com> */, Day14.Part2(myInput));
        }
    }
}
