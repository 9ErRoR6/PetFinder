using PetFinder.Entities.User;
using PetFinder.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using Swashbuckle.AspNetCore.Annotations;

namespace PetFinder.Dtos.Ad
{
    public class AdDto
    {
        public int UserId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public int AnimalTypeId { get; set; }  // Замість string AnimalType
        public string Color { get; set; }
        public bool IsLost { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public DateTime Date { get; set; }
        public IFormFile ImageUrl { get; set; }
    }
}
