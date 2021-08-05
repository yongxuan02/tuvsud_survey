using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tuvsud_survey.Data;
using tuvsud_survey.Model;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InputTypesController : ControllerBase
    {
        public JsonResult Get()
        {
            using (var context = new TuvSudContext())
            {
                var input_types = context.input_types.ToList();
                return new JsonResult(input_types);
            }
        }
    }
}
