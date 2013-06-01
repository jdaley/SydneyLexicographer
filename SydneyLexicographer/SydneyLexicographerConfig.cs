using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace SydneyLexicographer
{
    [XmlRoot("sydneyLexicographer")]
    public class SydneyLexicographerConfig
    {
        public static SydneyLexicographerConfig Current { get; set; }

        static SydneyLexicographerConfig()
        {
            string configFileName = "SydneyLexicographer.config";
            string configPath;

            if (HttpRuntime.AppDomainAppId == null)
            {
                configPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, configFileName);
            }
            else
            {
                configPath = Path.Combine(HttpRuntime.AppDomainAppPath, configFileName);
            }

            if (!File.Exists(configPath))
            {
                throw new Exception(configFileName + " does not exist.");
            }

            XmlSerializer serializer = new XmlSerializer(typeof(SydneyLexicographerConfig));

            using (StreamReader reader = new StreamReader(configPath))
            {
                Current = (SydneyLexicographerConfig)serializer.Deserialize(reader);
            }
        }

        [XmlElement("connectionString")]
        public string ConnectionString { get; set; }
    }
}