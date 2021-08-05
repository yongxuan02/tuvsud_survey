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
    public class CompanyTypeController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get()
        {
            using (var context = new TuvSudContext())
            {
                var company_type = context.company_types.ToList();
                return new JsonResult(company_type);
            }
        }
    }
}
