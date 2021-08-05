using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tuvsud_survey.Model;
using tuvsud_survey.Data;

namespace tuvsud_survey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OthersTypeController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get()
        {
            using (var context = new TuvSudContext())
            {
                var type = context.others_type.ToList();
                return new JsonResult(type);
            }
        }

        [HttpGet("{name}")]
        public int GetIdByName(string name)
        {
            using (var context = new TuvSudContext())
            {
                var ot = context.others_type.Where(s => s.type_name == name).FirstOrDefault();
                return ot.id;
            }
        }
    }
}
