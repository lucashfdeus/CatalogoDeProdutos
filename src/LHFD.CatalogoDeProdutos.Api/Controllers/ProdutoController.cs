using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LHFD.CatalogoDeProdutos.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("produtos")]
    public class ProdutoController : MainController
    {
        
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
       
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
       
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }
       
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
       
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
