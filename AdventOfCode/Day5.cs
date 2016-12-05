using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/5
    public static class Day5
    {
        public static string DecryptPassword(string input)
        {
            var numFound = 0;
            var counter = 0;
            var result = new StringBuilder(8);

            while (numFound < 8)
            {
                var hashedValue = HashPassword(input, counter);

                if (hashedValue.StartsWith("00000"))
                {
                    result.Append(hashedValue[5]);
                    numFound++;
                }

                counter++;
            }

            return result.ToString();
        }

        public static string DecryptPasswordWithPlaces(string input)
        {
            var numFound = 0;
            var counter = 0;
            var result = new char[8];
            var found = new bool[8];

            while (numFound < 8)
            {
                var hashedValue = HashPassword(input, counter);

                if (hashedValue.StartsWith("00000") && hashedValue[5] >= '0' && hashedValue[5] <= '7')
                {
                    var index = int.Parse(hashedValue[5].ToString());

                    if (!found[index])
                    {
                        found[index] = true;
                        result[index] = hashedValue[6];
                        numFound++;
                    }
                }

                counter++;
            }

            return string.Join("", result);
        }

        private static string HashPassword(string root, int val)
        {
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(Encoding.UTF8.GetBytes($"{root}{val}"));

                return string.Concat(hash.Select(h => h.ToString("x2")));
            }
        }
    }
}
