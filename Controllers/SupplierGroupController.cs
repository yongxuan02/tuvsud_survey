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
    public class SupplierGroupController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get()
        {
            using (var context = new TuvSudContext())
            {
                var supplier_group = context.supplier_group.ToList();
                return new JsonResult(supplier_group);
            }
        }
    }
}
