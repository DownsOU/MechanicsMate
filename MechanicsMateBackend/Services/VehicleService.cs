using MechanicsMateBackend.Models;
using MechanicsMateBackend.Models.VM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MechanicsMateBackend.Services
{
    public class VehicleService
    {
        public async Task<List<string>> GetAllMakes()
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                return await mmd.Mg1nYearMakeModelMasterAdvanceds.Select(v => v.Make).Distinct().ToListAsync();
            }
        }

        public async Task<List<string>> GetAllYear(string make)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                return await mmd.Mg1nYearMakeModelMasterAdvanceds.Where(v => v.Make == make).Select(v => v.Year).Distinct().ToListAsync();
            }
        }

        public async Task<List<string>> GetAllModel(string year, string make)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                return await mmd.Mg1nYearMakeModelMasterAdvanceds.Where(v => v.Year == year).Where(v => v.Make == make).Select(v => v.Model).Distinct().ToListAsync();
            }
        }

        public async Task<List<string>> GetAllVehicleDisplayName(string year, string make, string model)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                return await mmd.Mg1nYearMakeModelMasterAdvanceds.Where(v => v.Year == year).Where(v => v.Make == make).Where(v => v.Model == model).Select(v => v.VehicleDisplayName).ToListAsync();
            }
        }

        public async Task<VehicleDetail> GetDetails(string year, string make, string model, string vname)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                //return await mmd.Mg1nYearMakeModelMasterAdvanceds.Where(v => v.Year == year).Where(v => v.Make == make).Where(v => v.Model == model).Where(v=>v.VehicleDisplayName== vname).Select(v => v.YmmId).ToListAsync();
                var details = await mmd.Mg1nYearMakeModelMasterAdvanceds.Where(v => v.Year == year).Where(v => v.Make == make).Where(v => v.Model == model).Where(v => v.VehicleDisplayName == vname).FirstOrDefaultAsync();
                return new VehicleDetail
                {
                    YmmId = details.YmmId,
                    Make = details.Make,
                    Model = details.Model,
                    Year = details.Year,
                    Engine = details.Engine,
                    EngineLiterDisplay = details.EngineLiterDisplay,
                    Submodel = details.Submodel,
                    Trim = details.Trim,
                    Body = details.Body,
                    VehicleDisplayName = details.VehicleDisplayName,
                };
            }
        }

        public async Task AddCar(VehicleData vdata)
        {
            using (var mme = new mechanics_mate_devContext())
            {
                var data = new Vehicle();
                data.OwnerId = vdata.OwnerId;
                data.VehicleInfoId = vdata.VehicleInfoId;
                data.Mileage = vdata.Mileage;
                data.DrivingHabit = vdata.DrivingHabit;
                mme.Vehicles.Add(data);
                await mme.SaveChangesAsync();
            }
        }

        public async Task<List<KeyValuePair<int, string>>> GetAllCar(int uid)
        {
            using (var mme = new mechanics_mate_devContext())
            {
                var vehicleList = await mme.Vehicles.Where(v => v.OwnerId == uid).Include(v => v.VehicleInfo).ToListAsync();
                var idAndNameList = new List<KeyValuePair<int, string>>();
                foreach (var vehicle in vehicleList)
                {
                    idAndNameList.Add(new KeyValuePair<int, string>(vehicle.VehicleId, vehicle.VehicleInfo.VehicleDisplayName));
                }
                return idAndNameList;
            }

        }
        public async Task<VehicleDetail> GetData(string vname)
        {
            using (var mmd = new mechanics_mate_devContext())
            {

                var details = await mmd.Mg1nYearMakeModelMasterAdvanceds.Where(v => v.VehicleDisplayName == vname).FirstOrDefaultAsync();
                return new VehicleDetail
                {
                    YmmId = details.YmmId,
                    Make = details.Make,
                    Model = details.Model,
                    Year = details.Year,
                    Engine = details.Engine,
                    EngineLiterDisplay = details.EngineLiterDisplay,
                    Submodel = details.Submodel,
                    Trim = details.Trim,
                    Body = details.Body,
                    VehicleDisplayName = details.VehicleDisplayName,
                };
            }
        }

        public async Task DeleteVehicle(int id)
        {
            using (var mme = new mechanics_mate_devContext())
            {
                var car = await mme.Vehicles.Where(v => v.VehicleId == id).FirstOrDefaultAsync();
                mme.Vehicles.Remove(car);
                await mme.SaveChangesAsync();
            }
        }

        public async Task<List<KeyValuePair<uint, uint?>>> GetMileage_Driving(int id)
        {
            using (var mme = new mechanics_mate_devContext())
            {
                var vehicleList = await mme.Vehicles.Where(v => v.VehicleId == id).Include(v => v.VehicleInfo).ToListAsync();
                var idAndNameList = new List<KeyValuePair<uint, uint?>>();
                foreach (var vehicle in vehicleList)
                {
                    idAndNameList.Add(new KeyValuePair<uint, uint?>(vehicle.Mileage, vehicle.DrivingHabit));
                }
                return idAndNameList;
            }
        }

        public async Task UpdateCarDetails(int id, uint Mileage, uint? DrivingHabit)
        {
            using (var mme = new mechanics_mate_devContext())
            {
                var car = await mme.Vehicles.Where(v => v.VehicleId == id).FirstAsync();
                car.Mileage = Mileage;
                car.DrivingHabit = DrivingHabit.GetValueOrDefault();
                await mme.SaveChangesAsync();
            }
        }
    }
}
