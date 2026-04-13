using Ardalis.Specification;
using System.Security.Principal;

namespace PetFinder.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        Task Save();
        Task<TEntity?> GetItemBySpec(ISpecification<TEntity> specification);
        Task<IEnumerable<TEntity>> GetListBySpec(ISpecification<TEntity> specification);
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity?> GetByID(object id);
        Task Insert(TEntity entity);
        Task Delete(object id);
        Task Delete(TEntity entityToDelete);
        Task Update(TEntity entityToUpdate);
    }
}
