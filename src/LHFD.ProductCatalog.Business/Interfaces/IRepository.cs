using LHFD.ProductCatalog.Business.Entities;

namespace LHFD.ProductCatalog.Business.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : Entity
    {
        Task<TEntity?> GetById(Guid id);
        Task<List<TEntity>> GetAll();
        void Create(TEntity entity);
        void Update(TEntity entity);
        void Delete(Guid id);

        Task<int> SaveChanges();
    }
}
