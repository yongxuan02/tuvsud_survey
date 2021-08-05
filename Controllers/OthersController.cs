using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tuvsud_survey.Model;
using tuvsud_survey.Data;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OthersController : ControllerBase
    {
        [HttpGet("type/{type}")]
        public JsonResult GetByType(string type)
        {
            using (var context = new TuvSudContext())
            {
                var result = (from o in context.others
                              join ot in context.others_type on o.others_type_id equals ot.id
                              where ot.type_name == type
                              select new
                              {
                                  id = o.id,
                                  name = o.name,
                                  status = o.status,
                                  created_dt = o.created_dt.ToString("dd MMM yyyy")
                              }).ToList();

                return new JsonResult(result);
            }
        }



        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            using (var context = new TuvSudContext())
            {
                var others = context.others.Where(s => s.id == id).FirstOrDefault<others>();
                return new JsonResult(others);
            }
        }

        [HttpPost]
        public JsonResult Post([FromBody] others o)
        {
            using (var context = new TuvSudContext())
            {
                context.Add(o);
                context.SaveChanges();
                return new JsonResult(o.id);
            }


        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var context = new TuvSudContext())
            {
                var o = context.others.Where(s => s.id == id).FirstOrDefault<others>();
                System.Diagnostics.Debug.WriteLine(o.name);
                context.others.Remove(o);
                context.SaveChanges();
            }

        }

        [HttpPut("{id}")]
        public void Update(others o)
        {

            using (var context = new TuvSudContext())
            {
                var other = context.others.Where(s => s.id == o.id).FirstOrDefault<others>();
                other.name = o.name;
                other.status = o.status;
                context.SaveChanges();

            }
        }

    }
}
