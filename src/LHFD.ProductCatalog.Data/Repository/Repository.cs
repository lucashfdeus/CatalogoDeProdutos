using LHFD.ProductCatalog.Business.Entities;
using LHFD.ProductCatalog.Business.Interfaces;
using LHFD.ProductCatalog.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LHFD.ProductCatalog.Data.Repository
{
    public abstract class Repository<TEntity> : IRepository<TEntity> 
        where TEntity : Entity, new()
    {
        protected readonly ProductCatalogDbContext Db;
        protected readonly DbSet<TEntity> DbSet;

        protected Repository(ProductCatalogDbContext db)
        {
            Db = db;
            DbSet = db.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> Get(Expression<Func<TEntity, bool>> predicate)
        {
            return await DbSet.AsNoTracking().Where(predicate).ToListAsync();
        }

        public async Task<List<TEntity>> GetAll()
        {
            return await DbSet.ToListAsync();
        }

        public virtual async Task<TEntity?> GetById(Guid id)
        {
            return await DbSet.FindAsync(id);
        }

        public virtual void Create(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public virtual void Update(TEntity entity)
        {
            DbSet.Update(entity);
        }

        public virtual void Delete(Guid id)
        {
            DbSet.Remove(new TEntity { Id = id });
        }

        public async Task<int> SaveChanges()
        {
            return await Db.SaveChangesAsync();
        }

        public void Dispose()
        {
            Db.Dispose();
        }
    }
}
