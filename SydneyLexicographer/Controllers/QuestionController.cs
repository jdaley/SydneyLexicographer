using SydneyLexicographer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SydneyLexicographer.Controllers
{
    public class QuestionController : ApiController
    {
        public Question Get(string avoidIdsString)
        {
            int[] avoidIds = new int[0];

            if (!string.IsNullOrEmpty(avoidIdsString))
            {
                try
                {
                    avoidIds = avoidIdsString.Split('_').Select(s => int.Parse(s)).ToArray();
                }
                catch (Exception) { }
            }

            using (SydneyLexicographerContext context = new SydneyLexicographerContext())
            {
                int count = context.Questions.Count();
                int tries = 0;
                Question result;

                do
                {
                    int index = new Random().Next(count);
                    result = context.Questions.OrderBy(q => q.Id).Skip(index).Take(1).First();
                    tries++;
                }
                while (avoidIds.Contains(result.Id) && tries < 10);

                return result;
            }
           
            //return new Question
            //{
            //    Id = 54,
            //    PhotoUrl = @"http://dictionaryofsydney.org/files/wide/b16fbbf6b053225659d148b51ec14b12b93ba88e",
            //    Name = "Court house, Darlinghurst",
            //    Description = "Darlinghurst Courthouse was an early purpose-built courthouse that inspired courthouse design throughout the colony for the rest of the nineteenth century. The building redefined the streetscape of Darlinghurst Hill, and played a large part in Sydney's legal history.",
            //    Year = 1840,
            //    Latitude = (decimal)-33.8683,
            //    Longitude = (decimal)151.2086,
            //    Difficulty = 1
            //};
        }
    }
}
