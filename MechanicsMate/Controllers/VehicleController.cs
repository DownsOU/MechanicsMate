using Microsoft.AspNetCore.Mvc;
using MechanicsMateBackend.Models;
using MechanicsMateBackend.Models.VM;
using MechanicsMateBackend.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace MechanicsMate.Controllers
{
    public class YearObject
    {
        public string make { get; set; }

    }
    public class ModelObject
    {
        public string make { get; set; }
        public string year { get; set; }
    }
    public class VehicleNameObject
    {
        public string make { get; set; }
        public string year { get; set; }
        public string model { get; set; }
    }
    public class VNameObject
    {
        public string make { get; set; }
        public string year { get; set; }
        public string model { get; set; }
        public string vname { get; set; }
    }
    public class AddCarDetails
    {
        public int OwnerId { get; set; }
        public ulong VehicleInfoId { get; set; }
        public uint Mileage { get; set; }
        public uint? DrivingHabit { get; set; }
    }
    public class Carlist
    {
        public int uid { get; set; }
    }

    public class CarObject
    {
        public int Id { get; set; }
        public uint Mileage { get; set; }
        public uint? DrivingHabit { get; set; }
    }

    [EnableCors("CorsPolicy")]
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController: ControllerBase
    {
        [HttpGet]
        [Route("GetAllMakes")]
        public async Task<List<string>> GetAllMakes()
        {
            var vs = new VehicleService();
            return await vs.GetAllMakes();
        }

        [HttpPost]
        [Route("GetAllYear")]
        public async Task<List<string>> GetAllYear([FromBody] YearObject makeobj)
        {

            var vs = new VehicleService();
            return await vs.GetAllYear(makeobj.make);
        }

        [HttpPost]
        [Route("GetAllModel")]
        public async Task<List<string>> GetAllModel([FromBody] ModelObject modelobj)
        {

            var vs = new VehicleService();
            return await vs.GetAllModel(modelobj.year, modelobj.make);
        }

        [HttpPost]
        [Route("GetAllVehicleDisplayName")]
        public async Task<List<string>> GetAllVehicleDisplayName([FromBody] VehicleNameObject Nameobj)
        {

            var vs = new VehicleService();
            return await vs.GetAllVehicleDisplayName(Nameobj.year, Nameobj.make, Nameobj.model);
        }

        [HttpPost]
        [Route("GetDetails")]
        public async Task<VehicleDetail> GetDetails([FromBody] VNameObject Nameobj)
        {

            var vs = new VehicleService();
            return await vs.GetDetails(Nameobj.year, Nameobj.make, Nameobj.model, Nameobj.vname);
        }

        [HttpPost]
        [Route("AddCar")]
        public async Task<string> AddCar([FromBody] VehicleData vdata)
        {

            var vs = new VehicleService();
            try
            {
                await vs.AddCar(vdata);
                return "Success";
            }
            catch
            {
                return "Fail";
            }
        }

        [HttpPost]
        [Route("GetAllCar")]
        public async Task<List<KeyValuePair<int, string>>> GetAllCar([FromBody] Carlist Nameobj)
        {
            var vs = new VehicleService();
            return await vs.GetAllCar(Nameobj.uid);
        }

        [HttpPost]
        [Route("GetData")]
        public async Task<VehicleDetail> GetData([FromBody] YearObject Nameobj)
        {

            var vs = new VehicleService();
            return await vs.GetData(Nameobj.make);
        }

        [HttpPost]
        [Route("DeleteVehicle")]
        public async Task<string> DeleteVehicle([FromBody] Carlist id)
        {
            var vs = new VehicleService();
            try
            {
                await vs.DeleteVehicle(id.uid);
                return "Success";
            }
            catch
            {
                return "Fail";
            }
        }

        [HttpPost]
        [Route("GetMileage_Driving")]
        public async Task<List<KeyValuePair<uint, uint?>>> GetMileage_Driving([FromBody] Carlist Nameobj)
        {
            var vs = new VehicleService();
            return await vs.GetMileage_Driving(Nameobj.uid);
        }

        [HttpPost]
        [Route("UpdateCarDetails")]
        public async Task<string> UpdateCarDetails([FromBody] CarObject Nameobj)
        {
            var vs = new VehicleService();
            try
            {
                await vs.UpdateCarDetails(Nameobj.Id, Nameobj.Mileage, Nameobj.DrivingHabit);
                return "Success";
            }
            catch { return "Fail"; }
        }

        [HttpPost]
        [Route("GetCustList")]
        public async Task<List<KeyValuePair<int, string>>> GetCustList([FromBody] Carlist Nameobj)
        {
            var vs = new VehicleService();
            return await vs.GetCustList(Nameobj.uid);
        }
    }
}
