using SydneyLexicographer.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SydneyLexicographer
{
    public class SydneyLexicographerContext : DbContext
    {
        public DbSet<Question> Questions { get; set; }

        public SydneyLexicographerContext()
            : base(SydneyLexicographerConfig.Current.ConnectionString) { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Question>().Property(t => t.Latitude).HasPrecision(14, 10);
            modelBuilder.Entity<Question>().Property(t => t.Longitude).HasPrecision(14, 10);
        }

        
    }
}