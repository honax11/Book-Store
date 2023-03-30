using System.Text.Json.Serialization;

namespace BookStore.DataAccess.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum UserType
    {
        SuperAdmin,
        Admin,
        Customer
    }
}