using LHFD.CatalogoDeProdutos.Business.Entities;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using LHFD.CatalogoDeProdutos.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace LHFD.CatalogoDeProdutos.Data.Repository
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity, new()
    {
        protected readonly CatalogoDeProdutosDbContext Db;
        protected readonly DbSet<TEntity> DbSet;

        protected Repository(CatalogoDeProdutosDbContext context)
        {
            Db = context;
            DbSet = context.Set<TEntity>();
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
