using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XmlDownloader
{
    class Program
    {
        private static string FilePath = @"..\..\..\..\raw data\buildings-with-location.txt";
        private static string SaveFolder = @"..\..\..\..\raw data\";
        private static int XmlColumn = 1;
        
        static void Main(string[] args)
        {
            string applicationDirectory = System.Reflection.Assembly.GetExecutingAssembly().Location;
            applicationDirectory = applicationDirectory.Substring(0, applicationDirectory.LastIndexOf(@"\")+1);
            using (StreamReader reader = File.OpenText( FilePath ) )
            {
                string line = null;
                do
                {
                    line = reader.ReadLine();
                    if (line != null)
                    {
                        string[] items = line.Split(',');
                        System.Xml.XmlDocument doc = new System.Xml.XmlDocument();
                        string url = items[XmlColumn];
                        try
                        {
                            doc.Load(url);
                            string filename = items[XmlColumn].Substring(items[XmlColumn].LastIndexOf("/") + 1);
                            string filepath = Path.Combine(applicationDirectory, SaveFolder, filename);
                            doc.Save(filepath);
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine("Exception: " + url + "\r\n" + e.Message);
                        }
                        
                    }
                }
                while( line != null );
            }
            Console.Write("Press Enter key to close. ");
            while( Console.ReadKey().Key != ConsoleKey.Enter );
        }
    }
}
