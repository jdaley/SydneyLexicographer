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
        public Question Get()
        {
            return new Question
            {
                Id = 54,
                PhotoUrl = @"http://dictionaryofsydney.org/files/wide/b16fbbf6b053225659d148b51ec14b12b93ba88e",
                Name = "Court house, Darlinghurst",
                Description = "Darlinghurst Courthouse was an early purpose-built courthouse that inspired courthouse design throughout the colony for the rest of the nineteenth century. The building redefined the streetscape of Darlinghurst Hill, and played a large part in Sydney's legal history.",
                Year = 1840,
                Latitude = -33.8683,
                Longitude = 151.2086,
                Difficulty = 1
            };
        }
    }
}
