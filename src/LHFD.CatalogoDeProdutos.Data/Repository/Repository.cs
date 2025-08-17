using LHFD.CatalogoDeProdutos.Business.Entities;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using LHFD.CatalogoDeProdutos.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LHFD.CatalogoDeProdutos.Data.Repository
{
    public abstract class Repository<TEntity>(CatalogoDeProdutosDbContext context) : IRepository<TEntity> where TEntity : Entity, new()
    {
        protected readonly CatalogoDeProdutosDbContext Db = context;
        protected readonly DbSet<TEntity> DbSet = context.Set<TEntity>();

        public virtual async Task CreateAsync(TEntity entity)
        {
            DbSet.Add(entity);
            await SaveChangesAsync();
        }

        public virtual async Task UpdateAsync(TEntity entity)
        {
            DbSet.Update(entity);
            await SaveChangesAsync();
        }

        public virtual async Task<TEntity?> GetByIdAsync(Guid id) => await DbSet.FindAsync(id);

        public virtual async Task<List<TEntity>> GetAllAsync() => await DbSet.ToListAsync();        

        public virtual async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate)
            => await DbSet.AsNoTracking().Where(predicate).ToListAsync();

        public virtual async Task DeleteAsync(Guid id)
        {
            DbSet.Remove(new TEntity { Id = id });
            await SaveChangesAsync();
        }

        public async Task<int> SaveChangesAsync() => await Db.SaveChangesAsync();        

        public void Dispose() => Db?.Dispose();
    }
}
