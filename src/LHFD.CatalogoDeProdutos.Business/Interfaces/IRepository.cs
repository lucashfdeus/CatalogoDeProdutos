using LHFD.CatalogoDeProdutos.Business.Entities;
using System.Linq.Expressions;

namespace LHFD.CatalogoDeProdutos.Business.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : Entity
    {
        Task<bool> CreateAsync(TEntity entity);
        Task UpdateAsync(TEntity entity);
        Task<TEntity?> GetByIdAsync(Guid id);
        Task<List<TEntity>> GetAllAsync();
        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate);
        Task DeleteAsync(Guid id);
        Task<int> SaveChangesAsync();
    }
}
