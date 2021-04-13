using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public class ResponseMessage
    {
        [JsonProperty("statusCode")]
        public int StatusCode { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("result")]
        public object Result { get; set; }

        public static ResponseMessage GetResponse(HttpStatusCode statusCode, string message, object result)
        {
            return new ResponseMessage
            {
                Message = message,
                Result = result,
                StatusCode = (int)statusCode
            };
        }
    }
}
