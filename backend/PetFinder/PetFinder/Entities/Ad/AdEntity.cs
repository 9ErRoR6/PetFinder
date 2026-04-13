using PetFinder.Entities.User;
using PetFinder.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetFinder.Entities.Ad
{
    public class AdEntity :IEntity
    {
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public UserEntity User { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        [ForeignKey("AnimalType")]
        public int AnimalTypeId { get; set; }  // Замість string AnimalType
        public AnimalTypeEntity AnimalType { get; set; }

        public string Color { get; set; }
        public bool IsLost { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public DateTime Date { get; set; }
        public string ImageUrl { get; set; }
    }
}
