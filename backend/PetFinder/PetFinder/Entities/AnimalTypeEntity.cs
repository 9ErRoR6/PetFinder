using PetFinder.Interfaces;

namespace PetFinder.Entities
{
    public class AnimalTypeEntity: IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
