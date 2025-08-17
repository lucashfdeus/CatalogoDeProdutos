using LHFD.CatalogoDeProdutos.Business.Entities;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using LHFD.CatalogoDeProdutos.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace LHFD.CatalogoDeProdutos.Data.Repository
{
    public class DepartamentoRepository(CatalogoDeProdutosDbContext context) : IDepartamentoRepository
    {
        private readonly CatalogoDeProdutosDbContext _context = context;

        public async Task<List<Departamento>> GetAllAsync() => await _context.Departamentos.ToListAsync();

        public async Task<Departamento?> GetByIdAsync(int id) => await _context.Departamentos.FindAsync(id);
    }
}
