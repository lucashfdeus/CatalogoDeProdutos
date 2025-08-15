using LHFD.CatalogoDeProdutos.Business.Entities;

namespace LHFD.CatalogoDeProdutos.Business.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : Entity
    {
        void Create(TEntity entity);
        void Update(TEntity entity);
        Task<TEntity?> GetById(Guid id);
        Task<List<TEntity>> GetAll();
        void Delete(Guid id);
        Task<int> SaveChanges();
    }
}
