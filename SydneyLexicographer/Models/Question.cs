using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SydneyLexicographer.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Year { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public int Difficulty { get; set; }
    }
}