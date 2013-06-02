using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace SydneyLexicographerETL
{
    class Program
    {

       // degree[@from != "Harvard"]

      //  <detail id="160" type="Title" name="dc.title">Al-Zahra mosque</detail>
     // <detail id="523" type="Entity type" name="dc.type" ontology="basic">Building</detail>
     // <detail id="191" type="Extended description" name="dc.description">
     //   type="End Date" name="dc.coverage.finish"
        private static string RelPath = @"..\..\..\..\raw data";

        public static void Main(string[] args)
        {
            string basepath = System.Reflection.Assembly.GetExecutingAssembly().Location;
            basepath = basepath.Substring(0, basepath.LastIndexOf("\\") + 1);
            string rawDataFolder = Path.Combine(basepath, RelPath);
            string[] files = Directory.GetFiles(rawDataFolder,"*.xml");

            string testfile = @"C:\Users\pete\Documents\GitHub\SydneyLexicographer\raw data\7910.xml";
            for (int x = 0; x < files.Length; x++)
            {
            string imageUrl = string.Empty;
            string title = string.Empty;
            string desc = string.Empty;
            string point = string.Empty;
            string year = string.Empty;

                XmlDocument doc = new XmlDocument();
                doc.Load(files[x]);
               // doc.Load(testfile);
                XmlNode node = doc.SelectSingleNode("hml/records/record/detail[@name=\"dos.main_image\"]/record/detail/file/url");
                if (node != null)
                {
                    imageUrl = node.InnerText;
                    node = doc.SelectSingleNode("hml/records/record/detail[@name=\"dc.title\"]");
                    if (node != null)
                    {
                        title = node.InnerText;
                    }
                    node = doc.SelectSingleNode("hml/records/record/detail[@name=\"dc.description\"]");
                    if (node != null)
                    {
                        desc = node.InnerText;
                    }
                    node = doc.SelectSingleNode("hml/records/record/reversepointer/detail[@type=\"End Date\" and @name=\"dc.coverage.finish\"]/raw");
                    if (node != null)
                    {
                        year = node.InnerText;
                    }
                    node = doc.SelectSingleNode(".//geo/wkt");
                    if (node != null)
                    {
                        point = node.InnerText;
                    }
                    int i = 0;

                    Console.WriteLine("image url: " + imageUrl);
                    Console.WriteLine("Title: " + title);
                    Console.WriteLine("Description: " + desc);
                    Console.WriteLine("Year: " + year);
                    Console.WriteLine("Point: " + point);
                    Console.WriteLine("~~~~~~~~~~~~~~~~~~~");
                }
                else 
                {
                    Console.WriteLine("Node empty");
                    Console.WriteLine("~~~~~~~~~~~~~~~~~~~");
                }
           }
            Console.Write("Press Enter to exit.");
            while (Console.ReadKey().Key != ConsoleKey.Enter) ;
        }

        
    }
}
