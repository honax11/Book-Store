using BookStore.DataAccess.Models.Enums;
using Microsoft.VisualBasic.FileIO;

namespace BookStore.DataAccess.Models
{
    public class FileDetails
    {
        public int ID { get; set; }
        public string FileName { get; set; }
        public byte[] FileData { get; set; }
        public FileType FileType { get; set; }
    }
}
