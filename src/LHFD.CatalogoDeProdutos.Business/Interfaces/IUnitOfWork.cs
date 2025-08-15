namespace LHFD.CatalogoDeProdutos.Business.Interfaces
{
    public interface IUnitOfWork
    {
        Task<bool> Commit();
    }
}
